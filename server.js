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
    });
    initChoice();
}


const viewAllRoles = () => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        console.table(res);
    });
    initChoice();
}

const viewAllDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        console.table(res);
    });
    initChoice();
}
//add employees, roles, departments

const addEmployee = () => {
    // I'm not sure how to take the users inputs yet and insert them as values but im assuming it's something like user input is equal to a variable that then gets thrown into the query as a template literal
    const query = "INSERT INTO employee VALUES";
    connection.query(query, (err, res) => {
        console.table(res);
    });
    initChoice();
}

const addRole = () => {
    // 
    const query = "INSERT INTO role VALUES";
    connection.query(query, (err, res) => {
        console.table(res);
    });
    initChoice();
}

const addDepartment = () => {
    // 
    const query = "INSERT INTO department VALUES";
    connection.query(query, (err, res) => {
        console.table(res);
    });
    initChoice();
}

const updateEmployeeRole = () => {
// i have no idea how to do this one

    
}


