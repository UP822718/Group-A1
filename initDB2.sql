CREATE DATABASE IF NOT EXISTS login;
CREATE TABLE IF NOT EXISTS login.users (
  userId int auto_increment,
  username varchar(15) NULL,
  password varchar(60) NULL,
  primary key (`userId`))
ENGINE = InnoDB;
