const db = require("../models");
const Messages = db.messages;
const User = db.user;
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
const fs = require('fs');

// //creation d'un post//

exports.createMessage = (req, res, next) => {
    return Messages.create({
        title: req.body.title,
        text: req.body.text,
        usersId: req.body.usersId,
      })
        .then((messages) => {
          console.log(">> Created comment: " + JSON.stringify(messages, null, 4));
          return messages;
        })
        .catch((err) => {
          console.log(">> Error while creating comment: ", err);
        });
//     const messagesObject = {
// titre: req.body.titre,
// texte: req.body.texte,
// usersId: usersId
//     }
//     console.log(messagesObject);
//  const messages = new Messages({
//      ...messagesObject,
//      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//  })
 
//  messages.save()
//  .then(() => res.status(201).json({ message: 'Message enregistrée !' }))
//  .catch((error) => {res.status(400).json({ error })});

}

//Visionnage d'un message

exports.getOneMessages = (userId) => {

    // Messages.findOne({where:{ id: req.params.id} })
    // .then(messages => res.status(200).json(messages))
    // .catch( (error) =>  {res.status(404).json({
    //       error: error
    //     })});
 
        return Messages.findByPk(userId, { include: ["user"] })
        .then((messages) => {
            return messages;
          })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
    });
};
