import { Request, Response } from 'express';
import  userRepository  from '../models/user.model';
import { generateToken } from '../utils/tokenUtils';
import { hashPassword, comparePassword } from '../utils/passwordUtils';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    // Create user using the model
    const user = await userRepository.createUser(email, hashedPassword, fullName);

    // Generate token
    const token = generateToken(user.id.toString());

    return res.status(201).json({ token });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email using the model
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate token
    const token = generateToken(user.id.toString());

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Signin error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
