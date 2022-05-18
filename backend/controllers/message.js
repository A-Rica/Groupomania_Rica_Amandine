const db = require("../models");
const Message = db.message;
// const like = db.like;
const fs = require('fs');
const { user, comment } = require("../models");

// //creation d'un post//

exports.createMessage = (req, res, next) => {
  //condition si un fichier est téléchargé, alors on l'enregistre, sinon, un null est mis à la place
  if (req.file) {
    image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  } else {
    image = null;
  }
  //constante pour crée le nouveau message
  const message = new Message({
    title: req.body.title,
    text: req.body.text,
    image: image,
    userId: req.userId,

  });
  //sauvegarde du message
  message.save()
    //res status soit pour annoncé que le message à bien été crée, sinon erreur
    .then(() => res.status(201).json({ ...message, message: "message crée" }))
    .catch(error => res.status(400).json({ error }));
}

//Visionnage d'un message

exports.getOneMessages = (req, res, next) => {
  //utilisation d'un findOne pour récuperer les données du message incluant l'user
  Message.findOne({ where: { id: req.params.id }, include: ["user"] })
    //res status soit pour visualisé le message. Soit message d'erreur
    .then(message => res.status(200).json(message))
    .catch((error) => {
      res.status(404).json({
        error: error
      })
    });
};

exports.modifyMessage = async function (req, res, next) {
  //constant pour récuperer les données du message via l'id
  const message = await Message.findByPk(req.params.id);
  //mise en place d'une condition pour autoriser l'utilisateur créateur à modifier le message.
  if (req.userId === message.userId || req.userIsAdmin) {
    //mise en place d'une condition en récupérant les données du message via l'id incluant l'user.
    //utilisation du req.file dans une condition, pour savoir si l'image est modifié ou non, si c'est le cas, 
    // l'ancienne sera supprimer grace à un fs.unlinkSync
    // console.log(req.userIsAdmin);
    if (req.file) {
      Message.findOne({ where: { id: req.params.id }, include: ["user"] })

        .then(message => {

          if (message.image == null) {
            return;
          }
          const filename = message.image.split('/images/')[1];
          fs.unlinkSync(`images/${filename}`)
        })
    }
    //mise en place d'une constance avec la lecture des données grace aux req.body
    const messageObject = req.file ?
      {
        title: req.body.title,
        text: req.body.text,
        //mise en lien du fichier image téléchargé.
        image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      } : { ...req.body };
    console.log(messageObject);
    //utilisation update afin de mettre a jours les données que l'utilisateur aura modifié. le where servant à dire où chercher.
    Message.update({ ...messageObject, id: req.params.id }, { where: { id: req.params.id } })
      //dans la response 200 ont renvoie la constante crée plus tôt avec les données modifié. dans le cas contraire une erreur 400 apparaitra.
      .then(() => res.status(200).json({ ...messageObject }))
      .catch((error) => { res.status(400).json({ error }) });
  }
  else {
    // mise en place dans un else, d'un status 403 pour l'accès refusé
    res.status(403).send({
      message: `Vous n'êtes pas autorisé à modifier ce message.`
    });
  }
}
// mise en place d'une route pour voir tous les messages posté avec findAll en incluant l'utilisateur
exports.getAllMessages = async (req, res, next) => {
  Message.findAll({
    include:
      [
        "user", { model: comment, as: "comment", include: ["user"] }
      ]

  })

    //  Utilisation d'un status 200 en renvoyant les messages sinon erreur
    .then(messages => res.status(200).json(messages))
    .catch((error) => {
      res.status(400).json({ error })
    });
}
exports.deleteMessage = async function (req, res) {

  //utilisation de deux condition if recupérant le role user et admin 
  const message = await Message.findByPk(req.params.id);
  if (req.userId === message.userId || req.userIsAdmin) {

    // mise en place d'un findOne pour lire la base de données grace à son id. 
    Message.findOne({ where: { id: req.params.id } })
      // Suppression de l'image dans le dossier correspondant
      .then(message => {
        if (req.file) {
          const filename = message.image.split('/images/')[1];
          fs.unlink(`images/${filename}`);
        }
        message.destroy()
          .then(() => res.status(200).json({ message: 'message supprimé !' }))
          .catch(error => res.status(400).json({ error }));

      })
      //Renvoie d'une erreur en cas d'erreur lier au premier then
      .catch(error => res.status(500).json({ error }));
  }
  //renvoie erreur 403 pour non autorisation lier aux if permettant de récuperer l'id de l'utilisateur et
  //  savoir si l'utilisateur est admin ou non
  else {
    res.statue(403).send({
      message: `Vous n'êtes pas autorisé à supprimer ce message.`
    });
  }
}
