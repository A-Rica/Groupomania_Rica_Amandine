const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
let corsOptions = {
  origin: "http://localhost:8081"
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

  //requêtes Cors (cross origin ressource Sharing)//
  app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   res.setHeader('Content-Security-Policy', "default-src 'self'");
   next();
 });

const db = require("./models");
const users = require("./controllers/userCtrl");
const post = require("./controllers/post");

const run = async () => {
require("./routes/post")(app); 
};

db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
  run ();
}); 
// {force: true }



app.use('./images/', express.static(path.join(__dirname, 'images')));

require("./routes/authentification")(app);
require("./routes/profil")(app);
require("./routes/images")(app);


module.exports = app; 