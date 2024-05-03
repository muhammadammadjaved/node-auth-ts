import { Request, Response, NextFunction } from 'express';
import  userRepository  from '../models/user.model'; // Assuming user.model.ts has findUserByEmail

// Middleware to check for duplicate email
export const checkDuplicateEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const user = await userRepository.findUserByEmail(email);

    if (user) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    next();
  } catch (error) {
    console.error('Duplicate email check error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Middleware to check if roles exist (optional)
export const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
  // You can implement this middleware based on your specific requirements
  next();
};
