const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/api/hello', (req, res) => {
  res.send('Hello, world!');
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  // save user to database or do some other logic
  res.send(`User ${name} with email ${email} has been created.`);
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
