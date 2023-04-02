const jwt = require('jsonwebtoken');

const payload = {
  user_id: 12345,
  email: 'user@example.com',
};

const secretKey = 'my_secret_key';

const token = jwt.sign(payload, secretKey);

console.log(token);
