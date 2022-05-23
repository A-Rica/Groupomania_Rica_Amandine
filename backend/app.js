const express = require('express');
const app = express();
const path = require('path');

//permet de protéger contre les attaques Http
var hpp = require('hpp');
//limitation de l’accès à l’application
const cors = require('cors');
let corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

app.use(hpp());

const db = require("./models");
const run = async () => {
  require("./routes/message")(app)
  require("./routes/comment")(app)
};

// app.use((req, res, next) => {
//   console.log('file', req.file);
//   console.log('test');
// })


db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
  run();
});
// { force: true }

app.use('/images/', express.static(path.join(__dirname, 'images')));
app.use('/images_default/', express.static(path.join(__dirname, 'images_default')));

require("./routes/authentification")(app);
require("./routes/profil")(app);


module.exports = app;  