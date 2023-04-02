const express = require("express");
const jwt = require("jsonwebtoken");

//We can add these modules using the terminal inside VSCode. After that, we create an express application variable.
const app = express();

//We then define an app.get() method to create a json string with the desired message. 
app.get("/api", (req, res) => {
  res.json({
    message: "Hey, there! Welcome to this API service"
  });
});

//app.post() is a POST request and in the method parameters, we add URL, verifyToken, and request and response values.vverify() method then takes the request token as input and verifies whether it is correct. We set it to print an error message if it doesn’t match; otherwise, we print a message on the screen stating that the post was created.
app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "POST created...",
        authData
      });
    }
  });
});

//We define another POST method that creates a route for user login at the specified URL. JWT then uses the sign() method to create a JSON Web Token for that user and returns the token in the form of a JSON string.

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "john",
    email: "john@gmail.com"
  };

  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({
      token
    });
  });
  
});

//Finally, we define the method verifyToken() that takes care of the token verification process.  bearerHeader variable contains the token that is passed in the authorization field of request header.We add an if condition that checks whether the token exists in the authorization field; if not, we send an error status to the user.

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }

}

app.listen(3000, () => console.log("Server started"));