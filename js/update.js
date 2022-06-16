const data = require('./data');
const cTable = require('console.table');
const inquirer = require('inquirer');

// Create a new employee data db access object to access SQL query functions
const newData = new data();

// Use inquirer to prompt user for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

// Update employee role
const updateEmpRole = async () => {
    try {
        // get list of roles and employees to populate the inquirer choices
        const [roles, employees] = await Promise.all([newData.getRoles(), newData.getEmployees()])

        // choose an employee to update
        const updateEmp = await promptUser([

            {
                name: "empId",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    employees.forEach((emp) => {
                        const empObj = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
                        }
                        choiceArray.push(empObj)
                    })
                    return choiceArray;
                },
                message: "Which employee's role would you like to update?"
            },

        ]);

        // choose the employee's new role
        const newRole = await promptUser([
            {
                name: "roleId",
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
                message: "Choose the employee's new role:"
            },
        ]);

        // update the employee's role in the db
        await newData.updateEmpRole(newRole.roleId, updateEmp.empId)
        console.log("\n")
        console.log("Role Updated.😊")

    } catch (err) {
        console.log(err);
    }

}

// update an employee's manager
const updateEmpMgr = async () => {
    try {
        // get list of employees to populate the inquirer prompt
        const employees = await newData.getEmployees();

        // choose an employee to update
        const updateEmp = await promptUser([
            {
                name: "empId",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    employees.forEach((emp) => {
                        const empObj = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
                        }
                        choiceArray.push(empObj)
                    })
                    return choiceArray;
                },
                message: "Which employee's manager would you like to update?"
            },

        ]);

        // generate a list of employees excluding the chosen employee to populate the manager choices
        const managers = employees.filter((emp) => {
            return emp.id !== updateEmp.empId
        })

        // choose a new manager for the employee
        const newMgr = await promptUser([
            {
                name: "mgrId",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    managers.forEach((mgr) => {
                        const mgrObj = {
                            name: `${mgr.first_name} ${mgr.last_name}`,
                            value: mgr.id
                        }
                        choiceArray.push(mgrObj)
                    })
                    return choiceArray;
                },
                message: "Choose the employee's new manager:"
            },
        ]);

        // update employee with new manager in db
        await newData.updateEmpMgr(newMgr.mgrId, updateEmp.empId)
        console.log("\n")
        console.log("Manager Updated.😊")

    } catch (err) {
        console.log(err);
    }

}


module.exports = { updateEmpRole, updateEmpMgr }