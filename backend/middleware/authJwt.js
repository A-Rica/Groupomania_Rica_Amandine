const jwt = require("jsonwebtoken");
const config = require("../db/auth.config");
const db = require("../models");
const User = db.user;

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
  jwt.verify(token, config.secret, async function (err, decoded) {
    if (err) {
      return res.status(401).send({
        message: "Non Autorisé!"
      });
    }

    req.userId = decoded.userId;
    // console.log(db);
    const user = await User.findByPk(req.userId);
    req.userIsAdmin = (user.role == "admin") ? true : false
    // const roles = await user.role();
    // const user = await User.findOne({where: {id: req.userId}});

    console.log(req.userIsAdmin);
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken
};
module.exports = authJwt;