const mysql = require('mysql');
const inquirer = require('requirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'departmentDB'
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







        }



    })


}


const viewEmployees = () => {



}

const viewEmployeesByDep = () => {


    
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