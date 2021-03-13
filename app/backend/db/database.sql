create database if not exists spotdrop;
use spotdrop;
create table if not exists user(name varchar(15) not null, email varchar(254) not null unique, password varchar(128) not null, salt varchar(32) not null, profilepicture boolean not null, permission TINYINT(1) unsigned not null, date DATETIME not null, primary key (name));
