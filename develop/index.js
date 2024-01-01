//const functions = require('./functions')
const inquirer = require('inquirer');
const mysql = require('mysql2');



// functions.showLogo();


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
                showAllEmployees();
                break;
            case "View All Employees By Department":
                showEmployeesByDepartment();;
                break;
            case "View All Employees By Manager":
                showEmployeesByManager("Employees By Manager View", "View All Employees By Manager");
                break;
            case "Add Employee":
                promptAddEmployee();
                break;
            case "Remove Employee":
                prompteRemoveEmployee();
                break;
            case "Update Employee Role":
                prompteUpdateEmployeeRole();
                break;
            case "Update Employee Manager":
                prompteUpdateEmployeeManager();
                break;
            case "View All Roles":
                showData("Roles View", "View All Roles");
                break;
            case "Add Role":
                promptAddRole();
                break;
            case "Remove Role":
                promptRemoveRole();
                break;
            case "View All Departments":
                showData("All Departments", "View All Departments");
                break;
            case "Add Department":
                promptAddDepartment();
                break;
            case "Remove Department":
                promptRemoveDepartment();
                break;
            case "Quit":
                process.exit(0);
                break;
            default:
                showData("Main Menu", "Welcome to the Employee Tracker!");
                break;
        }
    })
    // .then(() => {
    //     MainMenu();
    // })
}


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '321LayOn',
      database: 'employee_db'
    },
    console.log(`Connected to DB: employee_db.`)
  );


var showLogo = function() {
    console.clear();
    console.log(`
    ┌───────────────────────────────────────────┐
    │  ┬ ┬┌─┐┬─┐┬┌─┌─┐┌─┐┬─┐┌─┐┌─┐╔╦╗╔═╗╔═╗╦ ╦  │
    │  ││││ │├┬┘├┴┐├┤ │ │├┬┘│  ├┤  ║║╠═╣╚═╗╠═╣  │
    │  └┴┘└─┘┴└─┴ ┴└  └─┘┴└─└─┘└─┘═╩╝╩ ╩╚═╝╩ ╩  │
    └───────────────────────────────────────────┘
    `);   //Attrib: https://patorjk.com/software/taag/
};


var showAllEmployees = function() {
    var sql =  "select employees.id as ID, employees.first_name as First_Name, employees.last_name as Last_Name, roles.role_title as Role, departments.department_name as Department, employees.manager_id as Manager_ID from employees join roles on employees.role_id = roles.id join departments on roles.department_id = departments.id order by ID asc";
    var params = "";
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
        }
            showLogo();
            showHeader("All Employees View");
            console.log(" ID    First Name      Last Name       Role                 Department           Manager");
            startData();
            for(var i = 0; i < result.length; i++) {
                var id = result[i].ID.toString().padEnd(5);
                var firstname = result[i].First_Name.padEnd(15);
                var lastname = result[i].Last_Name.padEnd(15);
                var roleid = result[i].Role.toString().padEnd(20);
                var department = result[i].Department.toString().padEnd(20);
                var manager_id = result[i].Manager_ID.toString().padEnd(4);
                var stringData = `${id} ${firstname} ${lastname} ${roleid} ${department} ${manager_id}`;
                showData(stringData);
            }
            endData();
            MainMenu();
        });
    
}

var showEmployeesByDepartment = function() {
    var sql =  "select employees.id as ID, employees.first_name as First_Name, employees.last_name as Last_Name, roles.role_title as Role, departments.department_name as Department, employees.manager_id as Manager_ID from employees join roles on employees.role_id = roles.id join departments on roles.department_id = departments.id order by Department asc, id asc";
    var params = "";
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
        }
            showLogo();
            showHeader("All Employees View");
            console.log(" ID    First Name      Last Name       Role                 Department           Manager");
            startData();
            for(var i = 0; i < result.length; i++) {
                var id = result[i].ID.toString().padEnd(5);
                var firstname = result[i].First_Name.padEnd(15);
                var lastname = result[i].Last_Name.padEnd(15);
                var roleid = result[i].Role.toString().padEnd(20);
                var department = result[i].Department.toString().padEnd(20);
                var manager_id = result[i].Manager_ID.toString().padEnd(4);
                var stringData = `${id} ${firstname} ${lastname} ${roleid} ${department} ${manager_id}`;
                showData(stringData);
            }
            endData();
            MainMenu();
        });
    
}

var showEmployeesByManager = function() {
    var sql =  "select employees.id as ID, employees.first_name as First_Name, employees.last_name as Last_Name, roles.role_title as Role, departments.department_name as Department, employees.manager_id as Manager_ID from employees join roles on employees.role_id = roles.id join departments on roles.department_id = departments.id order by manager_id asc, id asc";
    var params = "";
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
        }
            showLogo();
            showHeader("All Employees View");
            console.log(" ID    First Name      Last Name       Role                 Department           Manager");
            startData();
            for(var i = 0; i < result.length; i++) {
                var id = result[i].ID.toString().padEnd(5);
                var firstname = result[i].First_Name.padEnd(15);
                var lastname = result[i].Last_Name.padEnd(15);
                var roleid = result[i].Role.toString().padEnd(20);
                var department = result[i].Department.toString().padEnd(20);
                var manager_id = result[i].Manager_ID.toString().padEnd(4);
                var stringData = `${id} ${firstname} ${lastname} ${roleid} ${department} ${manager_id}`;
                showData(stringData);
            }
            endData();
            MainMenu();
        });
    
}


function showHeader(header) {
    const maxHeaderLength = 30;
    const truncateHeader = header.slice(0, maxHeaderLength);
    const formattedHeader = truncateHeader.padEnd(maxHeaderLength, " ");
    console.log("┌──────────────────────────────┐");
    console.log(`│${formattedHeader}│`);
    console.log("└──────────────────────────────┘");
}


function startData() {
    console.log("┌──────────────────────────────────────────────────────────────────────────────────────────┐");
}
function endData() {
    console.log("└──────────────────────────────────────────────────────────────────────────────────────────┘");
}

function showData(stringData) { 
    const maxLength = 90;
    const truncateData = stringData.slice(0, maxLength);
    const formattedData = truncateData.padEnd(maxLength, " ");
    console.log(`│${formattedData}│`);
}

const getDepartments = function() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id, department_name FROM departments ORDER BY id ASC";
        const params = "";
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const choices = result.map(department => ({
                    name: department.department_name,
                    value: department.id,
                }));
                resolve(choices);
            }
        });
    });
};
var getRoles = function() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id, role_title FROM roles ORDER BY id ASC";
        const params = "";
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const choices = result.map(role => ({
                    name: role.role_title,
                    value: role.id,
                }));
                resolve(choices);
            }
        });
    });
};


var getEmployees = function() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id, first_name, last_name FROM employees ORDER BY id ASC";
        const params = "";
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const choices = result.map(employee => ({
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.id,
                }));
                resolve(choices);
            }
        });
    });
};

async function promptAddEmployee() {
    //First get departments list
    const _departments = await getDepartments();
    //Then the roles list
    const _roles = await getRoles();
    //Then the employee list
    const _employees = await getEmployees();
    //Let's ask the questions using this as an await prompt since it's a submenu
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee\'s first name?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee\'s last name?',
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department does the employee belong to?',
            choices: _departments,
        },
        {
            type: 'list',
            name: 'role',
            message: 'What role is this employee?',
            choices: _roles,
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is this employees direct manager?',
            choices: _employees,
        }
    ]);
}


showLogo();
MainMenu();