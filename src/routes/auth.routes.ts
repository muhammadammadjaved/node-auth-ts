import { Router } from 'express';
import { signup, signin } from '../controllers/auth.controller';
import { checkDuplicateEmail, checkRolesExisted } from '../middlewares/verifySignUp';

const router = Router();

// Signup route
router.post(
  '/signup',
  [
    checkDuplicateEmail,
    checkRolesExisted
  ],
  signup
);

// Signin route
router.post('/signin', signin);

export default router;
