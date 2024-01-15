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
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Remove Department",
                "Add Role",
                "Remove Role",
                "Add Employee",
                "Update Employee Role",
                "*Update Employee Manager",
                "*Remove Employee",
                "*View All Employees By Department",
                "*View All Employees By Manager",
                "Quit"
            ]
        }
    ])
    .then((response) => {
        switch(response.action) {
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "Add Department":
                promptAddDepartment();
                break;
            case "Add Role":
                promptAddRole();
                break;
            case "Add Employee":
                promptAddEmployee();
                break;
            case "Update Employee Role":
                prompteUpdateEmployeeRole();
                break;


            case "*View All Employees By Department":
                showEmployeesByDepartment();;
                break;
            case "*View All Employees By Manager":
                showEmployeesByManager("Employees By Manager View", "View All Employees By Manager");
            break;

            case "*Remove Employee":
                prompteRemoveEmployee();
                break;
            case "*Update Employee Manager":
                prompteUpdateEmployeeManager();
                break;

            case "*Remove Role":
                promptRemoveRole();
                break;
            case "*Remove Department":
                promptRemoveDepartment();
                break;
            case "Quit":
                process.exit(0);
            default:
                showData("Main Menu", "Welcome to the Employee Tracker!");
                break;
        }
    })
    .catch((error) => {
        console.log(error);
        console.error(error.message);
    })
    
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


var viewEmployees = async function() {
    var sql = "select employees.id as ID, employees.first_name as First_Name, employees.last_name as Last_Name, roles.role_title as Role, departments.department_name as Department, roles.salary as salary , employees.manager_id as Manager_ID from employees  join roles on employees.role_id = roles.id  join departments on roles.department_id = departments.id  order by ID asc";
    var params = "";

    try {
        const result = await new Promise((resolve, reject) => {
            db.query(sql, params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        showLogo();
        showHeader("All Employees View");
        console.log(" ID  | First Name    | Last Name     | Role               | Department    | MGR | Salary");
        startData();
        for (var i = 0; i < result.length; i++) {
            var id = result[i].ID.toString().padEnd(5);
            var firstname = result[i].First_Name.padEnd(15);
            var lastname = result[i].Last_Name.padEnd(15);
            var roleid = result[i].Role.toString().padEnd(20);
            var department = result[i].Department.toString().padEnd(15);
            var manager_id = result[i].Manager_ID.toString().padEnd(4);
            var salary = result[i].salary.toString().padEnd(4);
            var stringData = `${id} ${firstname} ${lastname} ${roleid} ${department} ${manager_id} ${salary}`;
            showData(stringData);
        }
        endData();
        MainMenu();
    } catch (error) {
        console.log(error);
    }
};

var showEmployeesByDepartment = function() {
    var sql =  "select employees.id as ID, employees.first_name as First_Name, employees.last_name as Last_Name, roles.role_title as Role, departments.department_name as Department, employees.manager_id as Manager_ID from employees join roles on employees.role_id = roles.id join departments on roles.department_id = departments.id order by Department asc, id asc";
    var params = "";
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
        }
            showLogo();
            showHeader("All Employees View");
            console.log(" ID  | First Name    | Last Name     | Role               | Department         | Manager");
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
            console.log(" ID  | First Name    | Last Name     | Role               | Department         | Manager");
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
    //Now we have all the answers, let's add the employee
    return new Promise((resolve, reject) => {
        const sql = "insert into employees (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)";
        const params = [answers.firstName, answers.lastName, answers.role, answers.manager];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log("Employee added successfully!");
                resolve(result);
                MainMenu();
            }
        });
    });
    
}

async function prompteRemoveEmployee() {
    //get employees list
    const _employees = await getEmployees();
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to remove?',
            choices: _employees,
        },
        {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure you want to remove this employee?',
        default: false,
        }
    ]);
    if (answers.confirm) {
        return new Promise((resolve, reject) => {
            const sql = "delete from employees where id = ?";
            const params = [answers.employee];
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log("Employee removed successfully!");
                    resolve(result);
                    MainMenu();
                }
            });
        });
    } else {
        MainMenu();
    }
};

async function prompteUpdateEmployeeRole() {
    //get employees list
    const _employees = await getEmployees();
    //get roles list
    const _roles = await getRoles();
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: _employees,
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s new role?',
            choices: _roles,
        }
    ]);
    return new Promise((resolve, reject) => {
        const sql = "update employees set role_id = ? where id = ?";
        const params = [answers.role, answers.employee];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log("Employee role updated successfully!");
                resolve(result);
                MainMenu();
            }
        });
    });

}

async function prompteUpdateEmployeeManager() {
    //get employees list
    const _employees = await getEmployees();
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: _employees,
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is this employees new manager?',
            choices: _employees,
        }
    ]);
    return new Promise((resolve, reject) => {
        const sql = "update employees set manager_id = ? where id = ?";
        const params = [answers.manager, answers.employee];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log("Employee manager updated successfully!");
                resolve(result);
                MainMenu();
            }
        });
    });
}

async function viewRoles() {
    var sql = "select roles.id as ID, roles.role_title as Role, roles.salary as Salary, departments.department_name as Department_Name from roles join departments on roles.department_id = departments.id order by roles.id asc";
    var params = "";

    try {
        const result = await new Promise((resolve, reject) => {
            db.query(sql, params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        showLogo();
        showHeader("View all Roles");
        console.log(" ID  | Role Title         | Salary  | Department");
        startData();
        for (var i = 0; i < result.length; i++) {
            var id = result[i].ID.toString().padEnd(5);
            var roleid = result[i].Role.padEnd(20);
            var salary = result[i].Salary.toString().padEnd(10);
            var department = result[i].Department_Name.padEnd(20);
            var stringData = `${id} ${roleid} ${salary} ${department}`;
            showData(stringData);
        }
        endData();
        MainMenu();
    } catch (error) {
        console.log(error);
    }
}

async function promptAddRole() {
    //First get departments list
    const _departments = await getDepartments();
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'What is the role title?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?',
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department does the role belong to?',
            choices: _departments,
        }
    ]);
    return new Promise((resolve, reject) => {
        const sql = "insert into roles (role_title, salary, department_id) values (?, ?, ?)";
        const params = [answers.roleTitle, answers.salary, answers.department];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log("Role added successfully!");
                resolve(result);
                MainMenu();
            }
        });
    });

}

async function promptRemoveRole() {
    //get roles list
    const _roles = await getRoles();
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Which role would you like to remove?',
            choices: _roles,
        },
        {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure you want to remove this role?',
        default: false,
        }
    ]);
    if (answers.confirm) {
        return new Promise((resolve, reject) => {
            const sql = "delete from roles where id = ?";
            const params = [answers.role];
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log("Role removed successfully!");
                    resolve(result);
                    MainMenu();
                }
            });
        });
    } else {
        MainMenu();
    }
}

async function viewDepartments() {
    var sql = "select * from departments order by id asc";
    var params = "";

    try {
        const result = await new Promise((resolve, reject) => {
            db.query(sql, params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        showLogo();
        showHeader("View all Departments");
        console.log(" ID  | Department Name");
        startData();
        for (var i = 0; i < result.length; i++) {
            var id = result[i].id.toString().padEnd(5);
            var department = result[i].department_name.padEnd(20);
            var stringData = `${id} ${department}`;
            showData(stringData);
        }
        endData();
        MainMenu();
    } catch (error) {
        console.log(error);
    }
}

async function promptAddDepartment() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the department name?',
        }
    ]);
    return new Promise((resolve, reject) => {
        const sql = "insert into departments (department_name) values (?)";
        const params = [answers.departmentName];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log("Department added successfully!");
                resolve(result);
                MainMenu();
            }
        });
    });
}

async function promptRemoveDepartment() {
    //get departments list
    const _departments = await getDepartments();
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'department',
            message: 'Which department would you like to remove?',
            choices: _departments,
        },
        {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure you want to remove this department?',
        default: false,
        }
    ]);
    if (answers.confirm) {
        return new Promise((resolve, reject) => {
            const sql = "delete from departments where id = ?";
            const params = [answers.department];
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log("Department removed successfully!");
                    resolve(result);
                    MainMenu();
                }
            });
        });
    } else {
        MainMenu();
    }
}



showLogo();
MainMenu();