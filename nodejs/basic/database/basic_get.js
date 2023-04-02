// Importing the packages required for the project.  
const mysql = require('mysql'); 
const mysql2 = require('mysql2');  
const express = require('express');  
const port = 3003;

var app = express();  
const bodyparser = require('body-parser');  

// Connection String to Database  
var mysqlConnection = mysql2.createConnection({  
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
  
// Used for sending the Json Data to Node API  
  
// To Run the server with Port Number  
app.listen(port,()=> console.log("Express server is running at port no :" + port));  
  
app.get('/mahasiswa',(req,res)=>{  
    mysqlConnection.query('SELECT * FROM mahasiswa',(err,rows,fields)=>{  
    if(!err)   

         res.send(JSON.stringify(
            { 
                result: true,
                count: 0 , 
                data: rows 
            
            }));  
            
    else  
        console.log(err);  
      
})  
});

//Get the Employee Data based on Id  
app.get('/mahasiswa/:nim',(req,res)=>{  
    mysqlConnection.query('SELECT * FROM mahasiswa WHERE nim = ?',[req.params.nim],(err,rows,fields)=>{  
    if(!err)   
    res.send(rows);  
      //res.send(JSON.stringify({ data: rows })); => membuat JSON menjadi lengkap
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    else  
        console.log(err);  
      
})  
}); 