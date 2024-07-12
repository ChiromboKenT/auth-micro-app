import request from "supertest";
import bcrypt from "bcrypt";
import { userRepository } from "@repositories/UserRepository";
import app from "app";

jest.mock("../../src/repositories/userRepository");
jest.mock("bcrypt");

describe("Auth Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/auth/signup", () => {
    it("should create a new user and return user data with token", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");
      (userRepository.createUser as jest.Mock).mockResolvedValue(1);
      (userRepository.findUserById as jest.Mock).mockResolvedValue({
        id: 1,
        ...userData,
        password: "hashedpassword",
      });

      const response = await request(app)
        .post("/api/auth/signup")
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty("user");
      expect(response.body).toHaveProperty("token");
      expect(response.body.user).not.toHaveProperty("password");
    });

    it("should return 400 if email is already in use", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue({
        id: 1,
        ...userData,
      });

      await request(app).post("/api/auth/signup").send(userData).expect(400);
    });
  });

  describe("POST /api/auth/signin", () => {
    it("should return user data and token for valid credentials", async () => {
      const userData = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      };

      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(userData);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const response = await request(app)
        .post("/api/auth/signin")
        .send({email: "test@example.com", password: "password123"})
        .expect(200);

      expect(response.body).toHaveProperty("user");
      expect(response.body).toHaveProperty("token");
      expect(response.body.user).not.toHaveProperty("password");
    });

    it("should return 401 for invalid credentials", async () => {
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

      await request(app)
        .post("/api/auth/signin")
        .send({email: "test@example.com", password: "wrongpassword"})
        .expect(401);
    });
  });
});
