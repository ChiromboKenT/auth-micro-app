CREATE DATABASE IF NOT EXISTS authb; -- Create the database if it doesn't exist
GRANT ALL PRIVILEGES ON authb.* TO 'myuser'@'%';
FLUSH PRIVILEGES;

