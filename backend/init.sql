CREATE DATABASE IF NOT EXISTS authb;
GRANT ALL PRIVILEGES ON authb.* TO 'myuser'@'%';
FLUSH PRIVILEGES;