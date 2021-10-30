'use strict';
const express = require('express');

const cors = require('cors');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/api.route');

/*const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));*/

app.use(bodyParser.json());
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
  })
);
app.use('/.netlify/functions/server', router);  // path must route to lambda
//app.use('/', router); 
app.use('/api/', router); 
//app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
