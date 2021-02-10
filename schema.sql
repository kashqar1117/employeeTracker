DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE department(
 id INT AUTO_INCREMENT NOT NULL,
departmentName VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)

);
CREATE TABLE role(
 id INT AUTO_INCREMENT NOT NULL,
PRIMARY KEY (id), 
title VARCHAR(30) NOT NULL, 
salary DECIMAL(8,0) NOT NULL,
department_id INT(30)
);

CREATE TABLE employee(
 id INT AUTO_INCREMENT NOT NULL,
PRIMARY KEY (id),
firstName VARCHAR(30) NOT NULL, 
lastName VARCHAR(30) NOT NULL, 
role_id INT(30) NOT NULL, 
manager_id INT(30)
);


INSERT INTO department (departmentName) Values ("HR");
INSERT INTO role(title, salary, department_id) VALUES ("QA Analyst", "40000", "1");
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Kristina", "Al-ashqar", "1", "1");
