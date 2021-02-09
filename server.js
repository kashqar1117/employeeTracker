const express = require('express')
const app = express()
const PORT = 8080;

const inquirer = require('inquirer')
const mysql = require('mysql')

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mysqlpassword',
  database : 'employeeTracker_db'
});
 
connection.connect(err => {
    if (err) throw err
    console.log(`connected to mysql on thread ${connection.threadId}`)
    runSearch()

});

const runSearch = () =>  {
    inquirer
    .prompt(
        [
        {
            name: "action", 
            type:"list", 
            message: "whart would you like to do", 
            choices: [
                "add a department", 
                "add a role", 
                "add an employee", 
                "exit"
            ]
        
        }
    ]).then(answer =>{
        if(answer.action === "add a department"){
            console.log('adding dept')
        } else if(answer.action === "add a role"){
            console.log('adding role')
        }else if(answer.action === "add an employee"){
            console.log('adding employee')
        }else{
            exit()
        }
    })
}


const addDepartment = () =>{
    connection.query(`SELECT department, COUNT(*) FROM top5000 GROUP BY artist HAVING COUNT(*) > 1` , (err , res) =>{
        console.log(err)
        console.table(res)
        runSearch()
}
}

const exit = () => {
    connection.end()
    process.exit()
 }