const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require("mongoose");
const cors = require('cors')

// DB Setup
mongoose.connect('mongodb://localhost/Auth'), {useNewUrlParser: true}

// App Setup
app.use(morgan('combined')); 
app.use(cors());
app.use(bodyParser.json({ type: `*/*` }))
router(app);

// any incoming request will be passed to morgan and bodyParser
// morgan is a login framework, will mainly use for dedugging
// bodyParser parses incoming requests to json and will attempt to do so no matter the request type

// Server Setup
const PORT = process.env.PORT || 3090
const server = http.createServer(app) // http is native node library
server.listen(PORT)
console.log(`Server listening on: ${PORT}`)