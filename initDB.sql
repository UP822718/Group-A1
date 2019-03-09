CREATE DATABASE IF NOT EXISTS login;

CREATE TABLE IF NOT EXISTS login.user (
  userID int auto_increment primary key,
  username varchar(15) not null,
  password varchar(60) not null;
);
