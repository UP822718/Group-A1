CREATE DATABASE IF NOT EXISTS login;

CREATE TABLE IF NOT EXISTS login.login (
  userID INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(15) NULL,
  password VARCHAR(60) NULL,
  PRIMARY KEY (userID));