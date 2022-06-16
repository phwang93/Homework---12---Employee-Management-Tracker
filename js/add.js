const data = require('./data');
const cTable = require('console.table');
const inquirer = require('inquirer');

// Create a new employee data db access object to access SQL query functions
const newData = new data();

// Use inquirer to prompt user for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

// Add an employee
const addEmployee = async () => {
    try {
        // Get list of roles and employees (managers) to populate the inquirer prompts
        const [roles, employees] = await Promise.all([newData.getRoles(), newData.getEmployees()]);

        // Prompt the user for the new employee's information
        const newEmp = await promptUser([
            {
                type: 'input',
                message: "What's the employee's first name:",
                name: 'empFirst'
            },
            {
                type: 'input',
                message: "What's the employee's last name:",
                name: 'empLast'
            },
            {
                name: "empRole",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    roles.forEach((role) => {
                        const roleObj = {
                            name: role.title,
                            value: role.id
                        }
                        choiceArray.push(roleObj)
                    })
                    return choiceArray;
                },
                message: "What's the employee's role:"
            },
            {
                name: "empMgr",
                type: "list",
                choices: function () {
                    const choiceArray = [{ name: "None", value: -1 }];
                    employees.forEach((employee) => {
                        const mgrObj = {
                            name: employee.first_name + " " + employee.last_name,
                            value: employee.id
                        }
                        choiceArray.push(mgrObj);
                    })
                    return choiceArray;
                },
                message: "Who's the employee's manager:"
            },


        ]);

        // create the employee in the db 
        await newData.createEmployee(newEmp);
        console.log(`\n${newEmp.empFirst} ${newEmp.empLast} has been added!😊`);


    } catch (err) {
        console.log('Unable to add new employee!🙁', err);
    }
}

// Add a department
const addDepartment = async () => {
    try {

        // prompt the user for the name of the department
        const newDept = await promptUser([
            {
                type: 'input',
                message: "Enter the name of the new department:",
                name: 'deptName'
            },
        ]);

        // create the department in the db
        await newData.createDepartment(newDept);
        console.log(`${newDept.deptName} department added!😊`);


    } catch (err) {
        console.log('Unable to add new department!🙁', err);
    }
}

// Add a role
const addRole = async () => {
    try {
        // get a list of departments to populate the inquirer prompt
        const departments = await newData.getDepartments();

        // ask the user for the new role's information
        const newRole = await promptUser([
            {
                type: 'input',
                message: "Enter the title of the new role:",
                name: 'roleTitle'
            },
            {
                type: 'input',
                message: "Enter the salary for this role:",
                name: 'roleSalary',
                validate: function (salary) {
                    const valid = /\d+/.test(salary)
                    if (valid) {
                        return true;
                    } else {
                        return "Please enter a valid number for salary.";
                    }
                }
            },
            {
                name: "roleDept",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    departments.forEach((dept) => {
                        const deptObj = {
                            name: dept.department,
                            value: dept.id
                        }
                        choiceArray.push(deptObj)
                    })
                    return choiceArray;
                },
                message: "Which department does this role belong to:"
            },

        ]);

        // create the role in the db
        await newData.createRole(newRole);
        console.log(`${newRole.roleTitle} role added!😊`);


    } catch (err) {
        console.log('Unable to add new new role!🙁', err);
    }
}

module.exports = { addEmployee, addDepartment, addRole }