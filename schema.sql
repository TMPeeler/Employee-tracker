DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL
);


CREATE TABLE role (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(9, 2) NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    -- manager_id INT REFERENCES employee(id), idk if I need this if I'm not doing the bonus but I thought about it
    FOREIGN KEY (role_id) REFERENCES role(id)
);
