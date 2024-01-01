DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

create table department(
    id int not null auto_increment primary key,
    department_name varchar(30) not null
);

create table roles(
    id int not null auto_increment primary key,
    role_title varchar(30) not null,
    salary DECIMAL not null,
    department_id int not null,
    foreign key(department_id) references department(id)
);

create table employee(
    id int not null auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int,
    foreign key(role_id) references roles(id),
    foreign key(manager_id) references employee(id)
);
