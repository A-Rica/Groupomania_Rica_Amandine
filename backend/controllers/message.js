const db = require("../models");
const Messages = db.messages;
const User = db.user;
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
const fs = require('fs');
const message = require("../models/message");

// //creation d'un post//

exports.createMessage = (req, res, next) => {

  const messages = new Messages({
    title: req.body.title,
    text: req.body.text,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    userId: req.params.id,
    
  });

  messages.save()
  .then(() => res.status(201).json({ ...messages, messages: "message crée" }))
  .catch(error => res.status(400).json({ error }));
}

//Visionnage d'un message

exports.getOneMessages = (req, res, next) => {

  Messages.findOne({ where: {id: req.params.id}, include: ["user"] })
  .then(message => res.status(200).json(message))
  .catch( (error) =>  {res.status(404).json({
        error: error
      })});
};

exports.modifyMessage = (req, res, next) => {
  
  if (req.file) {
     Messages.findOne({where: {id: req.params.id}, include: ["user"]  })
  .then(message => {
 
    const filename = message.image.split('/images/')[1]; 
     fs.unlinkSync(`images/${filename}`)
  }) 
}  

const messageObject = req.file ?
{
  title: req.body.title,
  text: req.body.text,
//mise en lien du fichier image téléchargé.
  image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
} : { ...req.body };
console.log(messageObject); 
//utilisation update afin de mettre a jours les données que l'utilisateur aura modifié. le where servant à dire où chercher.
Messages.update({ ...messageObject, id:  req.params.id}, { where: { id: req.params.id }})
//dans la response 200 ont renvoie la constante crée plus tôt avec les données modifié. dans le cas contraire une erreur 400 apparaitra.
.then(() => res.status(200).json({ ...messageObject}))   
.catch((error) => {res.status(400).json({ error })});
}

exports.getAllMessages = (req, res, next) => {
  Messages.findAll({ include: ["user"]} )
    .then(message => res.status(200).json(message))
    .catch((error) => {res.status(400).json({ error })
  });
}
exports.deleteMessage = (req, res) => {

//utilisation de deux condition if recupérant le role user et admin

   //utilisation d'User.Destroy afin de supprimer l'utilisateur.
   Messages.findOne({ where: {id: req.params.id} })
   .then(message => {
     const filename = message.image.split('/images/')[1];
     fs.unlink(`images/${filename}`, () => {
       Messages.destroy({where: {id: req.params.id} })
         .then(() => res.status(200).json({ message: 'message supprimée !'}))
         .catch(error => res.status(400).json({ error }));
     });
   })
   .catch(error => res.status(500).json({ error }));

} 