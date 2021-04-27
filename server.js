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

        switch (response.choice) {
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
    const query = "SELECT employee.id, employee.first_name as 'First Name', employee.last_name as 'Last Name', role.title FROM employee JOIN role on role.id = employee.role_id;";
    connection.query(query, (err, res) => {
        console.table(res);
        console.log(err);
        if (err) throw err;
        initChoice();
    });

}


const viewAllRoles = () => {
    const query = "SELECT role.id, role.title, role.salary, department.id as 'Department ID', department.name as 'Department Name'  FROM role JOIN department on role.department_id = department.id;";
    connection.query(query, (err, res) => {
        console.table(res);
        if (err) throw err;
        initChoice();
    });
    // research clear command for terminal

}

const viewAllDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        console.table(res);
        if (err) throw err;
        initChoice();
    });

}
//add employees, roles, departments

const addEmployee = () => {
    // prompt user for firstname, lastname, role_id? then insert into employee table

    const roleQuery = 'SELECT title, id FROM role';
    connection.query(roleQuery, (err, res) => {
        // console.log(res[0].title);
        if (err) throw err;
        // console.log(err);
        const role = res.map(({ id, title }) => ({
            name: title,
            value: id
        }));

        console.log(role);


        inquirer.prompt([
            {
                name: "first_name",
                type: 'input',
                message: "Please enter the first name of your new employee:",

            },
            {
                name: "last_name",
                type: 'input',
                message: "Please enter the last name of your new employee:",
            },
            {
                name: "role_id",
                type: 'list',

                choices: role,
                message: "Please enter the role id of your new employee:",
                // {
                //     const role = [];
                //     // for (let i = 0; i < res.length; i++){
                //     //     role.push(res[i].title);

                //     // }

                //     // console.log(role);
                //     return role;
                // },

            }]
            // is this supposed to generate a list of choices from data in the database? I'm not sure this is the correct way to do it
        ).then((response) => {
            console.log("hello");
            const query = "INSERT INTO employee SET ?";
            connection.query(query, response, (err, res) => {
                console.table(res);
                if (err) throw err;
                initChoice();
            });
        });
        //how to insert into the table correctly?
    });
    // initChoice();
}

const addRole = () => {

    const depeartmentQuery = 'SELECT * FROM department';
    connection.query(depeartmentQuery, (err, res) => {
        // console.log(res[0].title);
        if (err) throw err;
        // console.log(err);
        const departmentChoices = res.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        console.log(departmentChoices);


        inquirer.prompt([

            {
                name: 'title',
                type: 'input',
                message: 'Please enter the name of the role you would like to add:'
            },
            {
                name: "salary",
                type: 'input',
                message: "Please enter the salary for this role:"
            },
            {
                name: 'department_id',
                type: 'list',
                message: "Please select a department",
                choices: departmentChoices
            }

        ]).then((response) => {
            const query = "INSERT INTO role SET ?";
            connection.query(query, response, (err, res) => {
                console.table(res);
                if (err) throw err;
                initChoice();
            });


        });
        // prompt user for new role title and salary, (maybe ask for ID or have it come up with a new ID automatically I'm not sure) then insert into the role table
    }); //closing SQL statement 
}


const addDepartment = () => {
    // prompt user for new department name, insert into department table
    inquirer.prompt({
        name: 'name',
        message: 'Please enter a department name:',
        type: 'input'
    }).then((response) => {

        const query = "INSERT INTO department SET ?";
        connection.query(query, response, (err, res) => {
            console.table(res);
            if (err) throw err;
            initChoice();
        });
    });


}

const updateEmployeeRole = () => {
    // prompt user for a particular employee, then allow them to pick from a list of current roles from database, then attach new role to selected employee (might be tricky) p.s. (maybe delete employee and then reInsert with new values?)
    const employeeQuery = 'SELECT * FROM employee';
    connection.query(employeeQuery, (err, res) => {
        // console.log(res[0].title);
        if (err) throw err;
        // console.log(err);
        const employeeChoices = res.map(({ id, first_name, last_name }) => ({
            name: first_name + last_name,
            value: id
        }));

        console.log(employeeChoices);

        const roleQuery = 'SELECT title, id FROM role';
        connection.query(roleQuery, (err, res) => {
            // console.log(res[0].title);
            if (err) throw err;
            // console.log(err);
            const role = res.map(({ id, title }) => ({
                name: title,
                value: id
            }));

            console.log(role);




            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Please select an employee',
                    choices: employeeChoices
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Please select a new role to add to this employee',
                    choices: role
                }


            ]).then((response) => {
                console.log(response);
                const query = "UPDATE employee SET role_id = ? WHERE id = ?";
                connection.query(query, [response.role, response.employee], (err, res) => {
                    console.table(res);
                    if (err) throw err;
                    console.log("Updated Employee Successfully!")
                    initChoice();
                });
            });
        });
    }); //EMPL SQL QUERY 

}


initChoice();