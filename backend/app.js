const express = require('express');
const app = express();
const cors = require('cors');
let corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  //requêtes Cors (cross origin ressource Sharing)//
  app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   res.setHeader('Content-Security-Policy', "default-src 'self'");
   next();
 });


app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;