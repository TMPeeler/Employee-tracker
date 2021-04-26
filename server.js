const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeeDB'
});

connection.connect((err) => {
if (err) throw err;
console.log(`connected as ID ${connection.threadId}\n`);
});

const initChoice = () => {
    inquirer.prompt({
        name: "choice",
        type: 'list',
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Roles", 
            "View All Departments", 
            "Add Employee", 
            "Add Role", 
            "Add Department", 
            "Update Employee Role",
            "Exit"
        ]
    }).then((response) => {

        switch(response.choice) {
            case "View All Employees":
                viewEmployees();
                break;
            
            case "View All Roles":
                viewAllRoles();
                break;    
            
            case "View All Departments":
                viewAllDepartments();
                break;   

            case "Add Employee":
                addEmployee();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Update Employee Role":
                updateEmployeeRole();
                break;

            case "Exit":
                connection.end();
                break;
        }
    });
}

//view employees, roles, departments
const viewEmployees = () => {
    const query = 'SELECT * FROM employees';
    connection.query(query, (err, res) => {
        console.table(res);
        if (err) throw err;
    });
    initChoice();
}


const viewAllRoles = () => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        console.table(res);
        if (err) throw err;
    });
    initChoice();
}

const viewAllDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        console.table(res);
        if (err) throw err;
    });
    initChoice();
}
//add employees, roles, departments

const addEmployee = () => {
    // prompt user for firstname, lastname, role_id? then insert into employee table
    
    const roleQuery = 'SELECT title FROM role';
    connection.query(roleQuery, (err, res) => {
        const role = [];
        role.push(res);
        if (err) throw err;
    
    inquirer.prompt(
    {
        name: "firstname",
        type: 'input',
        message: "Please enter the first name of your new employee:",
    },
    {
        name: "lastname",
        type: 'input',
        message: "Please enter the last name of your new employee:",
    },
    {
        name: "role_id",
        type: 'list',
        message: "Please enter the role id of your new employee:",
        choices: role
    },
    // is this supposed to generate a list of choices from data in the database? I'm not sure this is the correct way to do it
    ).then((response) => {
        const query = "INSERT INTO employee SET ?";
        connection.query(query, response, (err, res) => {
            console.table(res);
            if (err) throw err;
        });
    });
    //how to insert into the table correctly?
    
});
    initChoice();
}

const addRole = () => {
    // prompt user for new role title and salary, (maybe ask for ID or have it come up with a new ID automatically I'm not sure) then insert into the role table
    const query = "INSERT INTO role VALUES";
    connection.query(query, (err, res) => {
        console.table(res);
    });
    initChoice();
}

const addDepartment = () => {
    // prompt user for new department name, insert into department table
    const query = "INSERT INTO department VALUES";
    connection.query(query, (err, res) => {
        console.table(res);
    });
    initChoice();
}

const updateEmployeeRole = () => {
// prompt user for a particular employee, then allow them to pick from a list of current roles from database, then attach new role to selected employee (might be tricky) p.s. (maybe delete employee and then reInsert with new values?)

    
}


