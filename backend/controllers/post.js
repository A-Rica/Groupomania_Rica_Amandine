const db = require("../models");
const Messages = db.messages;
const Users = db.users;
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
const fs = require('fs');

// //creation d'un post//

// exports.createMessage = (req, res, next) => {
//   return Messages.create({
//     titre: req.body.titre,
//     texte: req.body.texte,
//     image:  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//   })
//  .then(() => res.status(201).json({ message: 'message enregistrée !' }))
//  .catch((error) => {res.status(400).json({ error })});
// }

// //Visionnage d'un message

// exports.getOneMessages = (req, res, next) => {
   
//   return Messages.findAll({ include:  [{ model: Users, as: 'users'}]})
//     .then((messages) => {
//       console.log(JSON.stringify(messages))
//     })
//     .catch((err) => {
//       console.log(">> Error while finding tutorial: ", err);
//     });
// };
