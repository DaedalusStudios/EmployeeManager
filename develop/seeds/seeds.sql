insert into departments(department_name)
values("Sales"),
("Engineering"),
("Finance"),
("Corporate");
       
insert into roles(role_title, salary, department_id)
values("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Account Manager", 160000, 3),
("Accountant", 125000, 3),
("Manager", 250000, 4),
("Regional Manger", 400000, 4);       

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Billy", "Clark", 2), 
       ("Jessica", "Oortman", 1), 
       ("Mark", "Richardson", 2),
       ("Sarah", "Smith", 3),
       ("John", "Doe", 4),
       ("Jane", "Doe", 8),
       ("James", "Starks", 7);

update employees set manager_id = 7;