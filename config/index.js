
//import dotenv from 'dotenv';
const dotenv = require('dotenv')
dotenv.config();
module.exports = {
  port: process.env.PORT,
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME
};

