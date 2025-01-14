import bcrypt from "bcrypt";
import {generateToken} from "../utils/jwt";
import {AppError} from "../utils/appError";
import {userRepository} from "../repositories/UserRepository";
import {User, UserWithoutPassword} from "../models/UserModel";

export class AuthService {
  async signup(
    userData: User
  ): Promise<{user: UserWithoutPassword; token: string}> {
    try {
      const existingUser = await userRepository.findUserByEmail(userData.email);
      if (existingUser) {
        throw new AppError("Email already in use", 400);
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const userId = await userRepository.createUser({
        ...userData,
        password: hashedPassword,
      });

      if (!userId) {
        throw new AppError("Error creating user", 500);
      }

      const newUser = await userRepository.findUserById(userId);
      if (!newUser) {
        throw new AppError("Error creating user", 500);
      }

      const {password, ...userWithoutPassword} = newUser;
      const token = generateToken(userId);

      return {user: userWithoutPassword, token};
    } catch (error) {
      throw new AppError(
        (error as any)?.message || "Internal server error",
        (error as any)?.statusCode || 500
      );
    }
  }

  async signin(
    email: string,
    password: string
  ): Promise<{user: UserWithoutPassword; token: string}> {
    try {
      const user = await userRepository.findUserByEmail(email);
      if (!user) {
        throw new AppError("Invalid credentials", 401);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new AppError("Invalid credentials", 401);
      }

      const {password: _, ...userWithoutPassword} = user;
      const token = generateToken(user.id!);

      return {user: userWithoutPassword, token};
    } catch (error) {
      throw new AppError(
       ( error as any)?.message || "Internal server error",
       ( error as any)?.statusCode || 500
      );
    }
  }
}

export const authService = new AuthService();
