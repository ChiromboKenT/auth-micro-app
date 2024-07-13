-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS authb;

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON authb.* TO 'myuser'@'%';
FLUSH PRIVILEGES;

-- Use the newly created database
USE authb;

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
