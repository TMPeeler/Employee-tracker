DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department (
id INT PRIMARY KEY,
name VARCHAR(30)
);
-- SELECT * FROM departmentDB;



-- DROP DATABASE IF EXISTS roleDB;
-- CREATE DATABASE roleDB;
-- USE roleDB;

CREATE TABLE role (
id INT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL ,
department_id INT
);
-- SELECT * FROM roleDB;


-- DROP DATABASE IF EXISTS employeeDB;
-- CREATE DATABASE employeeDB;
-- USE employeeDB;

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT 
);
-- SELECT * FROM employeeDB;