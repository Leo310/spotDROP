create database if not exists test;
use test;
create table if not exists user(id int auto_increment not null, name varchar(20), password varchar(20), primary key (id));
