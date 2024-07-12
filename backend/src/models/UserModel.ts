export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export interface UserWithoutPassword extends Omit<User, "password"> {}
