const data = require('./data');
const cTable = require('console.table');
const inquirer = require('inquirer');

// Create a new employee data db access object to access SQL query functions
const newData = new data();

// Use inquirer to prompt user for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

// Delete an employee
const delEmployee = async () => {
    try {

        // Get list of employees to populate inquirer choices
        const employees = await newData.getEmployees()
        const deleteEmp = await promptUser([

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
                message: "Which employee would you like to remove?"
            },

        ]);

        // Query to determine if the employee is a manager
        const [directReports, empToRemove] = await Promise.all([newData.getEmployeesWithMgr(deleteEmp.empId), newData.getEmployeeById(deleteEmp.empId)])

        const confirm = await promptUser([
            {
                name: "yN",
                type: "confirm",
                default: false,
                message: `\nAre you sure you want to remove ${empToRemove[0].first_name} ${empToRemove[0].last_name}? THIS WILL BE PERMANENT!😧`
            }
        ]);
        if (confirm.yN) {
            // Set manager to null for any employees with the employee to be deleted as manager
            directReports.forEach(async (emp) => {
                try {
                    await newData.updateEmpMgr(null, emp.id)
                } catch (err) {
                    console.log(err)
                }
            })
            // delete employee from db
            await newData.remove("employee", deleteEmp.empId)
            console.log(`\n${empToRemove[0].first_name} ${empToRemove[0].last_name} has been removed.😔`)
        }


    } catch (err) {
        console.log(err)
    }
}


// Delete a department
const delDepartment = async () => {
    try {
        // get a list of departments to populate inquirer choices
        const departments = await newData.getDepartments();
        const remove = await promptUser([

            {
                name: "deptId",
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
                message: "Which department would you like to remove?"
            },

        ]);

        // search for roles in this department
        const deptRoles = await newData.getRolesByDept(remove.deptId);
        // if this department has roles, warn the user that they will also be deleted, as well as employees with those roles
        if (deptRoles.length) {
            console.log("\n------------------------\n")
            console.log("WARNING: This department contains roles in use:")
            deptRoles.forEach((role) => {
                console.log(role.title)
            })
            console.log("If you remove this department, all roles and employees in this department WILL ALSO BE REMOVED!😧")
            console.log("\n------------------------\n")
        }
        // query to get the department name
        const removeDept = await newData.getDeptById(remove.deptId);
        // ask the user to confirm the delete
        const confirm = await promptUser([
            {
                name: "yN",
                type: "confirm",
                default: false,
                message: `\nAre you sure you want to remove ${removeDept[0].department}? THIS CANNOT BE UNDONE!😧`
            }
        ]);
        if (confirm.yN) {
            // if yes, delete the department from the db
            await newData.remove("department", remove.deptId)
            console.log(`\n${removeDept[0].department} department has been removed.😔`)

        }

    } catch (err) {
        console.log(err)
    }
}

// Delete a role
const delRole = async () => {
    try {
        // get a list of roles to populate the inquirer choices
        const roles = await newData.getRoles();
        const remove = await promptUser([

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
                message: "Which role would you like to remove?"
            },

        ]);

        // search for employees with this role
        const roleEmps = await newData.getEmployeesByRole(remove.roleId);
        // if there are employees with this role, warn the user that deleting the role will also delete the employees
        if (roleEmps.length) {
            console.log("\n------------------------\n")
            console.log("WARNING: This role is assigned to active employees:")
            roleEmps.forEach((emp) => {
                console.log(`${emp.first_name} ${emp.last_name}`)
            })
            console.log("If you remove this role, all employees assigned this role WILL ALSO BE REMOVED!😧")
            console.log("\n------------------------\n")
        }

        // get the name of the role to be removed
        const removeRole = await newData.getRoleById(remove.roleId);
        // ask the user to confirm the delete
        const confirm = await promptUser([
            {
                name: "yN",
                type: "confirm",
                default: false,
                message: `\nAre you sure you want to remove ${removeRole[0].title}? THIS CANNOT BE UNDONE!😧`
            }
        ]);
        // if yes, delete the role from the db
        if (confirm.yN) {
            await newData.remove("role", remove.roleId)
            console.log(`\n${removeRole[0].title} role has been removed.😔`)

        }

    } catch (err) {
        console.log(err)
    }
}



module.exports = { delDepartment, delEmployee, delRole }