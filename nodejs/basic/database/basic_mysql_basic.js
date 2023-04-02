// Importing the packages required for the project.  
const mysql = require('mysql');  
const express = require('express');  
const bodyparser = require('body-parser'); 

var app = express();    
// Used for sending the Json Data to Node API  
app.use(bodyparser.json());  
  
// Connection String to Database  
var mysqlConnection = mysql.createConnection({  
    host: 'localhost',  
    user : 'root',  
    password : '',   
    database : 'ras',  
    multipleStatements : true  
});  
  
// To check whether the connection is succeed for Failed while running the project in console.  
mysqlConnection.connect((err) => {  
    if(!err) {  
        console.log("Db Connection Succeed");  
    }  
    else{  
        console.log("Db connect Failed \n Error :" + JSON.stringify(err,undefined,2));  
    }  
});  