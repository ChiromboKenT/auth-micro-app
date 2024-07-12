

import { userRepository } from "@repositories/UserRepository";
import { AuthService } from "@services/AuthService";
import { AppError } from "@utils/appError";
import { generateToken } from "@utils/jwt";
import bcrypt from "bcrypt";

jest.mock("../../../src/repositories/userRepository");
jest.mock("bcrypt");
jest.mock("../../../src/utils/jwt");

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe("signup", () => {
    it("should create a new user and return user data with token", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };
      const hashedPassword = "hashedpassword";
      const userId = 1;
      const newUser = {id: userId, ...userData, password: hashedPassword};

      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (userRepository.createUser as jest.Mock).mockResolvedValue(userId);
      (userRepository.findUserById as jest.Mock).mockResolvedValue(newUser);
      (generateToken as jest.Mock).mockReturnValue("mockedtoken");

      const result = await authService.signup(userData);

      expect(result).toEqual({
        user: {id: userId, username: userData.username, email: userData.email},
        token: "mockedtoken",
      });
      expect(userRepository.createUser).toHaveBeenCalledWith({
        ...userData,
        password: hashedPassword,
      });
    });

    it("should throw an error if email is already in use", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue({
        id: 1,
        ...userData,
      });

      await expect(authService.signup(userData)).rejects.toThrow(AppError);
    });
  });

  describe("signin", () => {
    it("should return user data and token for valid credentials", async () => {
      const userData = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      };
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(userData);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockReturnValue("mockedtoken");

      const result = await authService.signin(
        "test@example.com",
        "password123"
      );

      expect(result).toEqual({
        user: {id: 1, username: "testuser", email: "test@example.com"},
        token: "mockedtoken",
      });
    });

    it("should throw an error for invalid email", async () => {
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

      await expect(
        authService.signin("test@example.com", "password123")
      ).rejects.toThrow(AppError);
    });

    it("should throw an error for invalid password", async () => {
      const userData = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      };
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(userData);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.signin("test@example.com", "wrongpassword")
      ).rejects.toThrow(AppError);
    });
  });
});
