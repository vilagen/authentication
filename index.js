const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require("./Routes/routes");
const path = require("path");
const PORT = process.env.PORT || 3090;
const app = express();
const db = require("./models")

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
//   }
  

// App Setup
app.use(morgan('combined')); 
app.use(bodyParser.json({ type: `*/*` }))
router(app);

// any incoming request will be passed to morgan and bodyParser
// morgan is a login framework, will mainly use for dedugging
// bodyParser parses incoming requests to json and will attempt to do so no matter the request type

// server setup
const syncOptions = { force: false };

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(`==> 🌎  API server now on http://localhost:${PORT}`);
  });
});