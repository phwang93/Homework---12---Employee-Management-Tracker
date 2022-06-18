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
("Accountant", 130000, 3),
("Sous Chef", 90000, 4), 
("Executive Chef", 120000, 4),  
("Lawyer", 190000, 5), 
("Partner", 250000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Philip", "Hwang", 3, NULL), 
("Samy", "Tann", 4, 1), 
("Debbi", "U", 6, NULL), 
("Neo", "Du", 2, NULL), 
("Keeler", "Cowie", 1, 4),
("Nick", "Choi", 5, 2);

