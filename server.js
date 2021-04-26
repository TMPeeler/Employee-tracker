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
            "View All Employees by Department", 
            "View All Employees by Manager", 
            "Add Employee", 
            "Remove Employee", 
            "Update Employee Role", 
            "Update Employee Manager",
            "View All Roles"
        ]
    }).then((response) => {

        switch(response.choice) {
            case "View All Employees":
                viewEmployees();
                break;
            case "View All Employees by Department":
                viewEmployeesByDep();
                break;
            
            case "View All Employees by Manager":
                viewEmployeesByMan();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Remove Employee":
                removeEmployee();
                break;
            
            case "Update Employee Role":
                updateEmployeeRole();
                break;

            case "Update Employee Manager":
                updateEmployeeMan();
                break;

            case "View All Roles":
                viewAllRoles();
                break;
        }
    });
}


const viewEmployees = () => {
    const query = 'SELECT * FROM employees';
    connection.query(query, (err, res) => {
        res.forEach(({employee}) =>
            console.log(employee));
    });
    initChoice();
}

const viewEmployeesByDep = () => {
    const query = 'SELECT department'


    
}

const viewEmployeesByMan = () => {


    
}

const addEmployee = () => {


    
}

const removeEmployee = () => {


    
}

const updateEmployeeRole = () => {


    
}

const updateEmployeeMan = () => {


    
}

const viewAllRoles = () => {


    
}