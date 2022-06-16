const data = require('./data');
const cTable = require('console.table');
const inquirer = require('inquirer');

// Create a new employee data db access object to access SQL query functions
const newData = new data();

// Use inquirer to prompt user for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};