import jwt from 'jsonwebtoken';

// Generate token
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, 'your_secret_key', { expiresIn: '1d' });
};
