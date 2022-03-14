const jwt = require("jsonwebtoken");
const config = require("../db/auth.config");
const db = require("../models");
const Users = db.users;

verifyToken = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (!token) {
      return res.status(403).send({
        message: "Aucun Token fournis!"
      });
    }
    // console.log(jwt.verify(token, config.secret));
    console.log(config.secret);
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Non Autorisé!"
        });
      }
      req.users_Id = decoded.id;
      next();
    });
  };
  isAdmin = (req, res, next) => {
    Users.findByPk(req.users_Id).then(users => {
      users.getAdministration().then(administration => {
        for (let i = 0; i < administration.length; i++) {
          if (administration[i].nom === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({
          message: "Droit d'administration requis!"
        });
        return;
      });
    });
  };

  const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
  };
  module.exports = authJwt;