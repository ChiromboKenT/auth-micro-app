import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.API_PORT || 3000,
};
