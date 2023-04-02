//// npm i express
const express = require('express');  
var app = express(); 
var port = 3000;

// To Run the server with Port Number  
app.listen(port,()=> console.log("Express server is running at port no :" + port));  
