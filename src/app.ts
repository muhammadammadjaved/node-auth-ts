// app.ts
import express from 'express';
import cors from 'cors';
import routes from './index'
// import { createUser, findUserByUsername } from './user.model';
// import { hashPassword, comparePassword } from './utils';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { connect, pool } from './config/db.config';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);

(async () => {
    try {
      await connect();
  
      // Start your application logic using the pool if needed
      // ...
    } catch (error) {
      console.error('Error connecting to database:', error);
      process.exit(1); 
    }
  })();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
