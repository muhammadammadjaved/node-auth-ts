import pgPromise, { IDatabase, IMain } from 'pg-promise';
import bcrypt from 'bcrypt';

// Define the user interface
interface User {
  id: number;
  email: string;
  password: string; // Hashed password
  fullName: string;
}

// Define the user repository interface
interface UserRepository {
  createUser(email: string, password: string, fullName: string): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}

// Initialize pg-promise
const pgp: IMain = pgPromise({});
const db: IDatabase<any> = pgp('postgres://username:password@localhost:5432/database_name');

// Define the user repository
const userRepository: UserRepository = {
  async createUser(email: string, password: string, fullName: string): Promise<User> {
    const hashedPassword = await hashPassword(password);

    return db.one(
      'INSERT INTO users (email, password, full_name) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, fullName]
    );
  },

  async findUserByEmail(email: string): Promise<User | null> {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
  }
};

// Function to hash password (assuming using bcrypt)
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
  return await bcrypt.hash(password, salt);
}

export default userRepository;
