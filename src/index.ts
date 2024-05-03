import { Router } from 'express';
import authRoute from './routes/auth.routes';

const router = Router();

router.use(authRoute);
// router.use(userRoute);

export default router;
