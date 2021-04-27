# Employee-tracker HW


The purpose of this assignment was to build a command line application that took user input and retreived or stored it in a database. Using the inquirer package to prompt the user for inputs and then storing those in tables using the mySQL package.


## Getting Started
First I generated a new repo and began generating my base files for schema, server functionality in javascript, and my dependencies via NPM packages. Then in each base file I generated my basic schema for how the tables in the database should operate, outlined basic functionality for my command line app, and put some basic values into a seed file. 


### Prerequisites
Must have a package.json from npm init. Then it's necessary to install all the dependencies for inquirer, mysql, and cTable. Must create and run a new database in MySQL workbench before running the application.


### Solving
The employee tracker was solved by establishing a server on our localhost and connecting a database to it via MySQL. Then in our javascript the user was prompted via inquirer and a main menu function of initial choice was written to give the user all the necessary choices critical to the demands of the assignment. Using those basic functions they're fed through a switch case to activate other functions based on the initial user choice. Each function activated by the switch case is performing a query to the database and then responding with the information queried for via console.table which is a method of the cTable package that allows the user to view tables in the command line instead of responding with objects. Some of the functions require calling for certain pieces of data from the database in order to populate certain lists in the inquirer prompts and it's done by storing the queries in a new mapped variable and then calling that variable inside the inquirer prompt.



## Technologies Used

* [JavaScript](https://www.javascript.com/)
* [ExpressJS](https://expressjs.com/)
* [NodeJS](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)


## Video Link
https://drive.google.com/file/d/1gTav_WihzGCQTS33CW0mKMocLLEJOxcj/view


## Authors
* **Thomas Peeler** 


## Github Repository
- [https://github.com/TMPeeler/Employee-tracker]