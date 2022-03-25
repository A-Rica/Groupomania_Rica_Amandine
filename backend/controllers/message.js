const db = require("../models");
const Message = db.message;
const fs = require('fs');

// //creation d'un post//

exports.createMessage = (req, res, next) => {

  const message = new Message({
    title: req.body.title,
    text: req.body.text,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    userId: req.params.id,
    
  });

  message.save()
  .then(() => res.status(201).json({ ...message, message: "message crée" }))
  .catch(error => res.status(400).json({ error }));
}

//Visionnage d'un message

exports.getOneMessages = (req, res, next) => {

  Message.findOne({ where: {id: req.params.id}, include: ["user"] })
  .then(message => res.status(200).json(message))
  .catch( (error) =>  {res.status(404).json({
        error: error
      })});
};

exports.modifyMessage = (req, res, next) => {
  //
  
  if ( req.body.userId === req.body.id || req.body.role ==="admin"){

  if (req.file) {
     Message.findOne({where: {id: req.params.id}, include: ["user"]  }) 
 
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
Message.update({ ...messageObject, id:  req.params.id}, { where: { id: req.params.id }})
//dans la response 200 ont renvoie la constante crée plus tôt avec les données modifié. dans le cas contraire une erreur 400 apparaitra.
.then(() => res.status(200).json({ ...messageObject}))   
.catch((error) => {res.status(400).json({ error })});
  }
  else{
    res.send({
      message: `Vous n'êtes pas autorisé à modifier ce message.`
    });
  }
}

exports.getAllMessages = (req, res, next) => {
  Message.findAll({ include: ["user"]} )
    .then(messages => res.status(200).json(messages))
    .catch((error) => {res.status(400).json({ error })
  });
}
exports.deleteMessage = (req, res) => {

//utilisation de deux condition if recupérant le role user et admin 
if (req.body.id ===  req.body.userId || req.body.role === "admin"){
   //utilisation de message.Destroy afin de supprimer le message
   Message.findOne({ where: {id: req.params.id} })
   .then(message => {
     const filename = message.image.split('/images/')[1];
     fs.unlink(`images/${filename}`, () => {
       Message.destroy({where: {id: req.params.id} })
         .then(() => res.status(200).json({ message: 'message supprimé !'}))
         .catch(error => res.status(400).json({ error }));
     });
   })
   .catch(error => res.status(500).json({ error }));
  }
  else{
    res.send({
      message: `Vous n'êtes pas autorisé à supprimer ce message.`
    });
  }
} 