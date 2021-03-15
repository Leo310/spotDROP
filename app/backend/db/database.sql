create database if not exists spotdrop;
use spotdrop;

create table if not exists user(
    name varchar(15) not null, 
    email varchar(254) not null unique, 
    password varchar(128) not null, 
    salt varchar(32) not null, 
    profilepicture boolean not null, 
    permission TINYINT unsigned not null, 
    date DATETIME not null, 
    primary key (name)
);

create table if not exists spot(
    sid int unsigned not null auto_increment, 
    username varchar(15) not null, 
    title varchar(35) not null, 
    description varchar(1000), 
    image boolean not null, 
    street varchar(100) not null, 
    housenumber varchar(3) not null, 
    zip varchar(9) not null, 
    city varchar(50) not null, 
    ustars TINYINT, 
    date DATETIME not null, 
    primary key (sid), 
    foreign key (username) 
        references user(name) 
        on delete cascade 
        on update cascade
);

create table if not exists categorizes(
    sid int unsigned not null,
    name varchar(50) not null,
    primary key (sid, name),
    foreign key (sid)
        references spot(sid)
        on delete cascade 
        on update cascade
);

create table if not exists views(
    username varchar(15) not null,
    sid int unsigned not null,
    date DATETIME not null,
    primary key (username, sid),
    foreign key (username) 
        references user(name) 
        on delete cascade 
        on update cascade,
    foreign key (sid) 
        references spot(sid) 
        on delete cascade 
        on update cascade
);

create table if not exists rates(
    username varchar(15) not null,
    sid int unsigned not null,
    title varchar(35) not null, 
    stars TINYINT not null,
    text varchar(1000),
    date DATETIME not null,
    primary key (username, sid),
    foreign key (username) 
        references user(name) 
        on delete cascade 
        on update cascade,
    foreign key (sid) 
        references spot(sid) 
        on delete cascade 
        on update cascade
);