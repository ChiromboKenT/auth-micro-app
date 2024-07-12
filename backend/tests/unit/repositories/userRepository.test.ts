import pool from "@config/database";
import { UserRepository } from "@repositories/UserRepository";


jest.mock("../../../src/config/database", () => ({
  execute: jest.fn(),
}));

describe("UserRepository", () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a user and return the insert id", async () => {
      const mockUser = {
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      };
      const mockInsertId = 1;

      (pool.execute as jest.Mock).mockResolvedValue([{insertId: mockInsertId}]);

      const result = await userRepository.createUser(mockUser);

      expect(result).toBe(mockInsertId);
      expect(pool.execute).toHaveBeenCalledWith(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [mockUser.username, mockUser.email, mockUser.password]
      );
    });
  });

  describe("findUserByEmail", () => {
    it("should return a user when found", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      };

      (pool.execute as jest.Mock).mockResolvedValue([[mockUser]]);

      const result = await userRepository.findUserByEmail("test@example.com");

      expect(result).toEqual(mockUser);
      expect(pool.execute).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = ?",
        ["test@example.com"]
      );
    });

    it("should return null when user is not found", async () => {
      (pool.execute as jest.Mock).mockResolvedValue([[]]);

      const result = await userRepository.findUserByEmail(
        "nonexistent@example.com"
      );

      expect(result).toBeNull();
    });
  });

  describe("findUserById", () => {
    it("should return a user when found", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      };

      (pool.execute as jest.Mock).mockResolvedValue([[mockUser]]);

      const result = await userRepository.findUserById(1);

      expect(result).toEqual(mockUser);
      expect(pool.execute).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE id = ?",
        [1]
      );
    });

    it("should return null when user is not found", async () => {
      (pool.execute as jest.Mock).mockResolvedValue([[]]);

      const result = await userRepository.findUserById(999);

      expect(result).toBeNull();
    });
  });
});
