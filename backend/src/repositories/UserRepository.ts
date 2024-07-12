import {RowDataPacket} from "mysql2";
import pool from "../config/database";
import { User } from "@models/UserModel";


export class UserRepository {
  async createUser(user: User): Promise<number> {
    const [result] = await pool.execute<RowDataPacket[]>(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [user.username, user.email, user.password]
    );
    return result[0].insertId;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return (rows[0] as User) || null;
  }

  async findUserById(id: number): Promise<User | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return (rows[0] as User) || null;
  }
}

export const userRepository = new UserRepository();
