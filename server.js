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
                "veiw department", 
                "view role", 
                "view employee", 
                "add a department", 
                "add a role", 
                "add an employee",
                "Would you like to update someones role?", 
                "exit"
            ]
        
        }
    ]).then(answer =>{
        if(answer.action === "veiw department"){
            viewDepartment()
        } else if(answer.action === "view role"){
            viewRole()
        }else if(answer.action === "view employee"){
            viewEmployee()
        }else if(answer.action ==="add a department"){  
            addDepartment()
        }else if(answer.action==="add a role"){
            addRole()
        }else if(answer.action ==="add an employee"){
            addemployee()

        }else if(answer.action === "Would you like to update someones role?"){
            updateRole()
        }
        else{
            exit()
        }
    })
}


const viewDepartment = () =>{
    
    connection.query("SELECT departmentName FROM department" , (err , res) =>{
        if (err) throw err;
        console.table(res)
        runSearch()
}
    )}

 const viewRole = () =>{
    connection.query("SELECT * FROM role" , (err , res) =>{
        if (err) throw err;
        console.table(res)
        runSearch()

 }   
 )}
 const viewEmployee = () =>{
    connection.query("SELECT * FROM employee" , (err , res) =>{
        if (err) throw err;
        console.table(res)
        runSearch()

 }   
 )}

 const addDepartment = () =>{
    inquirer.prompt([{
        name:"newDepartment", 
        type:'input', 
        message:"Name of new department?"
    }]).then(answer =>{
        connection.query(`INSERT INTO department (departmentName) VALUES ("${answer.newDepartment}")`)
        runSearch()

    })
 }

 const addRole = () =>{
     inquirer.prompt([{
         name:"newRole", 
         type:'input', 
         message:"Name of new role?"
     }, 
     {
        name:"salary", 
        type:'input', 
        message:"What is the salary of this role?"
     },
     {
        name:"department_id", 
        type:'input', 
        message:"What is the department id?"
     } 


    ]).then(answer =>{
         connection.query("INSERT INTO role(title, salary, department_id) VALUES (?,?,?)", 
         [answer.newRole , answer.salary, answer.department_id], 
         function(err, res){
             if (err) throw err;
             viewRole()
             runSearch()
         })
     })
 }

 const addemployee = () =>
 {
    inquirer.prompt([{
        name:"firstname", 
        type:'input', 
        message:"First name?"
    }, 
    {
       name:"lastname", 
       type:'input', 
       message:"Lats name?"
    },
    {
       name:"role_id", 
       type:'input', 
       message:"role id number?"
    },
    {
        name:"manager_id", 
        type:'input', 
        message:"manager id number?"
     }
    ]

    ).then( answer =>{
        connection.query("INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES (?,?,?,?)", 
        [answer.firstname , answer.lastname , answer.role_id , answer.mamager_id], 
        function(err, res){
            console.log(res)
            if (err) throw err;
            viewEmployee()
            runSearch()
        })
    })
}


const updateRole = () =>{
    
    connection.query("SELECT * FROM role" , (err , res) =>{
        if (err) throw err;
        console.table(res)
        inquirer.prompt([{
                name:"currentRole", 
                type:"list", 
                message:"choose a new role",
                choices:res.map(role  =>({
                    name: role.title,
                    value: role.id
                }))
                
            }, 
           { 
            name:"newRole", 
            type:"input", 
            message:"What is the change in role?"
        }
        ]).then(answer =>{
        connection.query("UPDATE employee SET role_id=? WHERE firstName = ?", [answer.currentRole  , answer.newRole], (err, res)=>{
            console.log(res)
        
        
            if (err) throw err;

            viewEmployee()
            runSearch()
        })
        })
  

 }   
 )









}

const exit = () => {
    connection.end()
    process.exit()
 }