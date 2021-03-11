create database if not exists test;
use test;
create table if not exists user(name varchar(15) not null, email varchar(254) not null unique, password varchar(128) not null, salt varchar(32) not null, pppath varchar(256), permission TINYINT(1) not null, date DATETIME not null, primary key (name));
