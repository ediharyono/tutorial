// Importing the packages required for the project.  
  
const mysql = require('mysql');  
const express = require('express');  
var app = express();  
const bodyparser = require('body-parser');  
const { body, validationResult } = require('express-validator');
  
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
  
// To Run the server with Port Number  
app.listen(3000,()=> console.log("Express server is running at port no : 3000"));  
  
// CRUD Methods  
//Get all mahasiswa  
app.get('/mahasiswa',(req,res)=>{  
    mysqlConnection.query('SELECT * FROM mahasiswa',(err,rows,fields)=>{  
    if(!err)   
        res.send(rows);  
    else  
        console.log(err);  
      
})  
});  
  
//Get the mahasiswa Data based on Id  
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

//
app.get('/mahasiswa1', function (req, res) {
    //query
    mysqlConnection.query('SELECT * FROM mahasiswa ORDER BY nim ASC', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Posts',
                data: rows
            })
        }
    });
});
//Delete the mahasiswa Data based on Id  
app.delete('/mahasiswa/:nim',(req,res)=>{  
    mysqlConnection.query('DELETE FROM mahasiswa WHERE nim = ?',[req.params.nim],(err,rows,fields)=>{  
    if(!err)   
    res.send("Data Deletion Successful");  
    else  
        console.log(err);  
      
})  
});  
  
//////////////////////////POST/////////////////

app.post('/mahasiswa1', [

    //validation
    body('nim').notEmpty(),
    body('nama_mahasiswa').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        nim: req.body.nim,
        nama_mahasiswa: req.body.nama_mahasiswa
    }

    // insert query
    mysqlConnection.query('INSERT INTO mahasiswa SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
            
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            })
        }
    })

});

  
//Update an mahasiswa through the Stored Procedure  
//app.put('/mahasiswa1',(req,res)=>{  
   // let emp = req.body;  
 //   var sql = "SET @EmpID = ?;SET @Name = ?;SET @Designation = ?;SET @City = ?;SET @ContactNo = ?; \  
  //            CALL AddorUpdatemahasiswa(@EmpID,@Name,@Designation,@City,@ContactNo);"  
  //  mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.Designation,emp.City,emp.ContactNo],(err,rows,fields)=>{  
    //if(!err)   
    //res.send("Updation Done");  
    //else  
      //  console.log(err);  
//})  
//});  