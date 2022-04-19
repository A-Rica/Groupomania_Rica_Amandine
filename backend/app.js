const express = require('express');
const app = express();
const path = require('path');
// sécurisation des cookies pcontre les attaques par injection
const session = require('cookie-session')
// temps d'expiration d'1heure
let expiryDate = new Date(Date.now() + 60 * 60 * 1000)
// sécurisation de l'application des vulnérabilité courrante avec Helmet
const helmet = require("helmet");
//permet de protéger contre les attaques Http
var hpp = require('hpp');
//limitation de l’accès à l’application

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

// mise en place de la sécurisation des cookies avec cookies session. en y incluant des clés
app.use(session({
  name: 'session',
  keys: [process.env.KEY_SESSION_1, process.env.KEY_SESSION_2],
  cookie: {
    secure: true,
    httpOnly: true,
    expires: expiryDate
  }
}));

app.use(helmet());
// sécurisation de l'utilisateur en interdisant l'utilisation d'iframe afin d'empêcher toutes récupération des données
// de l'utilisateur via une fausse page "Anti-click Jacking"
app.use(helmet.frameguard({ action: 'deny' }));

app.use(hpp());

const db = require("./models");
const run = async () => {
  require("./routes/message")(app)
  require("./routes/comment")(app)
};


db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
  run();
});
// { force: true }

app.use('./images/', express.static(path.join(__dirname, 'images')));

require("./routes/authentification")(app);
require("./routes/profil")(app);


module.exports = app;  