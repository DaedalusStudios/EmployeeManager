const inquirer = require('inquirer');
const functions = require('./functions/display')




functions.showData("Main Menu", "Welcome to the Employee Tracker!");


function MainMenu() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles",
                "Add Role",
                "Remove Role",
                "View All Departments",
                "Add Department",
                "Remove Department",
                "Quit"
            ]
        }
    ])
    .then((response) => {
        switch(response.action) {
            case "View All Employees":
                functions.showData("All Employees View", "View All Employees");
                break;
            case "View All Employees By Department":
                functions.showData("Employees By Department View", "View All Employees By Department");
                break;
            case "View All Employees By Manager":
                functions.showData("Employees By Manager View", "View All Employees By Manager");
                break;
            case "Add Employee":
                functions.promptAddEmployee();
                break;
            case "Remove Employee":
                functions.prompteRemoveEmployee();
                break;
            case "Update Employee Role":
                functions.prompteUpdateEmployeeRole();
                break;
            case "Update Employee Manager":
                functions.prompteUpdateEmployeeManager();
                break;
            case "View All Roles":
                functions.showData("Roles View", "View All Roles");
                break;
            case "Add Role":
                functions.promptAddRole();
                break;
            case "Remove Role":
                functions.promptRemoveRole();
                break;
            case "View All Departments":
                functions.showData("All Departments", "View All Departments");
                break;
            case "Add Department":
                functions.promptAddDepartment();
                break;
            case "Remove Department":
                functions.promptRemoveDepartment();
                break;
            case "Quit":
                process.exit(0);
                break;
            default:
                functions.showData("Main Menu", "Welcome to the Employee Tracker!");
                break;
        }
    })
    .then(() => {
        MainMenu();
    })
}

MainMenu();