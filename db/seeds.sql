INSERT INTO department (name)
VALUES 
("Sales"), 
("Engineering"), 
("Finance"),
("Restaurant"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Professional", 80000, 1), 
("Sales Director", 100000, 1), 
("Engineer Manager", 150000, 2), 
("Software Engineer", 120000, 2), 
("CFO", 130000, 3),
("Accountant", 70000, 3),
("Sous Chef", 90000, 4), 
("Executive Chef", 120000, 4),  
("Lawyer", 190000, 5), 
("Partner", 250000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Diana", "Nguyen", 6, 4), 
("Philip", "Hwang", 2, NULL),  
("David", "Bird", 1, 2), 
("Ivy", "Ha", 5, NULL), 
("Samy", "Tann", 9, 7), 
("Debbi", "U", 3, NULL), 
("Neo", "Du", 10, NULL), 
("Keeler", "Cowie", 7, 10),
("Nick", "Choi", 4, 6),
("Viet", "Nguyen", 8, NULL);

