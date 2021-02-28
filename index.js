const inquirer = require("inquirer");
const fs = require("fs");
const emailValidator = require("email-validator");

const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

let employeeType = "Manager";
let newEmployee;

const team = [];

function getUserInput() {
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: `What is the name of the ${employeeType.toLowerCase()}?`,
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            name: "id",
            message: `What is the id of the ${employeeType.toLowerCase()}?`,
            validate: answer => {
                if (!/^[0-9]+$/gi.test(answer)) {
                    return "Must be numbers only";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "email",
            message: `What is the email address of the ${employeeType.toLowerCase()}?`,
            validate: answer => {
                if (!emailValidator.validate(answer)) {
                    return "Must be a valid email address";
                }
                return true;
            }
        },
    ]).then(function (data) {
        newEmployee = new Employee(data.name, data.id, data.email);
        switch (employeeType) {
            case "Manager":
                getManagerData();
                break;
            case "Engineer":
                getEngineerData();
                break;
            case "Intern":
                getInternData();
                break;
            default:
                console.log("Shouldn't get this message - something is wrong!");
        }
    }
    )
}
function getManagerData() {
    inquirer.prompt([
        {
            type: "input",
            name: "officeNumber",
            message: `What is the manager's office number?`,
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },

    ]).then(function (data) {
        const newManager = new Manager(newEmployee.getName(), newEmployee.getId(), newEmployee.getEmail(), data.officeNumber);
        // console.log(newManager);
        team.push(newManager);
        checkForMoreEmployees();
    }
    )
}

function getEngineerData() {
    inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: `What is the engineer's GitHub username?`,
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },

    ]).then(function (data) {
        const newEngineer = new Engineer(newEmployee.getName(), newEmployee.getId(), newEmployee.getEmail(), data.github);
        // console.log(newEngineer);
        team.push(newEngineer);
        checkForMoreEmployees();
    }
    )
}

function getInternData() {
    inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: `What school does the intern attend?`,
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },

    ]).then(function (data) {
        const newIntern = new Intern(newEmployee.getName(), newEmployee.getId(), newEmployee.getEmail(), data.school);
        // console.log(newIntern);
        team.push(newIntern);
        checkForMoreEmployees();
    }
    )
}

function checkForMoreEmployees() {
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    inquirer.prompt([
        {
            type: "list",
            name: "employeeType",
            message: "What type of employee would you like to enter the details on?",
            choices: [
                "Engineer",
                "Intern",
                "I'm done entering employees"
            ]
        },
    ]).then(function (data) {
        employeeType = data.employeeType;
        switch (data.employeeType) {
            case "Engineer":
                getUserInput();
                break;
            case "Intern":
                getUserInput();
                break;
            default:
                console.log("Done entering employees - build HTML!");
                buildHtml();
        }
    }
    )
}

getUserInput();

const html = [];
let globalCardString = "";

function buildHtml() {
    html.push(...team.filter(newEmployee => newEmployee.getRole() === "Manager").map(manager => renderCardHtml(manager, "Manager")));
    html.push(...team.filter(newEmployee => newEmployee.getRole() === "Engineer").map(engineer => renderCardHtml(engineer, "Engineer")));
    html.push(...team.filter(newEmployee => newEmployee.getRole() === "Intern").map(intern => renderCardHtml(intern, "Intern")));
    const outputPathIndex = `${__dirname}/dist/index.html`
    fs.writeFileSync(outputPathIndex,buildPage(globalCardString), "utf-8");
    buildStyleSheet()
}

function buildPage(cardString) {

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
        ${cardString}
        </div>
        </div>
        </body>
        </html>
        `
}

function renderCardHtml(text, role) {
    let cardTitle;
    let groupItem;
    switch (role) {
        case "Manager":
            cardTitle = `<h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${text.getRole()}</h3>`
            groupItem = `<li class="list-group-item">Office number: ${text.getOfficeNumber()}</li>`
            break;

        case "Engineer":
            cardTitle = `<h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${text.getRole()}</h3>`
            groupItem = `<li class="list-group-item">GitHub: <a href="https://github.com/${text.getGithub()}" target="_blank" rel="noopener noreferrer">${text.getGithub()}</a></li>`
            break;

        case "Intern":
            cardTitle = `<h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${text.getRole()}</h3>`
            groupItem = `<li class="list-group-item">School: ${text.getSchool()}</li>`
            break;

        default:
            break;
    };
    const cardHtml = `
    <div class="team-area col d-flex justify-content-center">
    <div class="card employee-card shadow rounded">
    <div class="card-header">
    <h2 class="card-title">${text.getName()}</h2>
    ${cardTitle}
    </div>
    <div class="card-body">
    <ul class="list-group">
    <li class="list-group-item">ID: ${text.getId()}</li>
    <li class="list-group-item">Email: <a href="mailto:${text.getEmail()}">${text.getEmail()}</a></li>
    ${groupItem}
    </ul>
    </div>
    </div>
    </div>
    `;
    globalCardString += cardHtml;
}

function buildStyleSheet() {

    const styleText = `
    .team-heading {
        background-color: #E84755;
        color: white;
    }
    
    .employee-card {
        margin: 10px;
        width: 18rem;
    }
    
    .card-header {
        background-color: #0477F7;
        color: white;
    }`

    const outputPathStyle = `${__dirname}/dist/style.css`
    fs.writeFileSync(outputPathStyle,styleText, "utf-8");
}