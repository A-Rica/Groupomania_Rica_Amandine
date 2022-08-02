const db = require("../models");
const Comment = db.comment;
const fs = require('fs');

//creation d'un commentaire//

exports.createComment = (req, res, next) => {
  //mise en place d'une condition permettant de savoir si une image est téléchargé ou non, si non, l'image sera indiquer "null"
  if (req.file) {
    image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    video = `${req.protocol}://${req.get("host")}/videos/${req.file.filename}`;
  } else {
    image = null;
  }

  //création d'une constante comment afin de récuperer les données entrées
  const comment = new Comment({
    text: req.body.text,
    image: image,
    video: video,
    userId: req.body.userId,
    messageId: req.body.messageId

  });
  //sauvegarde du commentaire et visualisation de ce dernier dans un res status, sinon, erreur
  comment.save()
    .then(() => res.status(201).json({ ...comment, message: "commentaire crée" }))
    .catch(error => res.status(400).json({ error }));
}

//visualisation des commentaires//

//mise en place du findAll incluant l'utilisateur et le message
exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    include: {
      all: true
    }
  })
    //visualisation des commentaires lier au messages dans un status 200 sinon erreur
    .then(comments => res.status(200).json(comments))
    .catch((error) => {
      res.status(400).json({ error })
    });
  //,
}

exports.modifyComment = async function (req, res, next) {
  //création d'une constante afin de récuperer les données lier au commentaires via l'id
  const comment = await Comment.findByPk(req.params.id);
  //mise en place d'une condition pour autoriser l'utilisateur créateur à modifier le commentaire.
  if (req.userId == comment.userId || req.userIsAdmin) {
    //mise en place d'une condition en récupérant les données du commentaire via l'id incluant l'user et le message.
    //utilisation du req.file dans une condition, pour savoir si l'image est modifié ou non, si c'est le cas, 
    // l'ancienne sera supprimer grace à un fs.unlinkSync
    if (req.file) {
      Comment.findOne({ where: { id: req.params.id }, include: ["user", "message"] })

        .then(comment => {
          if (comment.image == null) {
            return;
          }
          const filename = comment.image.split('/images/')[1];
          fs.unlinkSync(`images/${filename}`)

        })
        .then(comment => {
          if (comment.video == null) {
            return;
          }
          const filenameVideo = comment.video.split('/videos/')[1];
          fs.unlinkSync(`videos/${filenameVideo}`)
        })
    }
    //mise en place d'une constance avec la lecture des données grace aux req.body

    const commentObject = req.file ?
      {
        text: req.body.text,
        //mise en lien du fichier image téléchargé.
        image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        video: `${req.protocol}://${req.get("host")}/videos/${req.file.filename}`,
      } : { ...req.body };
    console.log(commentObject);
    //utilisation update afin de mettre a jours les données que l'utilisateur aura modifié. le where servant à dire où chercher.
    Comment.update({ ...commentObject, id: req.params.id }, { where: { id: req.params.id } })
      //dans la response 200 ont renvoie la constante crée plus tôt avec les données modifié. dans le cas contraire une erreur 400 apparaitra.
      .then(() => res.status(200).json({ ...commentObject }))
      .catch((error) => { res.status(400).json({ error }) });
  }
  else {
    // mise en place dans un else, d'un status 403 pour l'accès refusé
    res.status(403).send({
      message: `Vous n'êtes pas autorisé à modifier ce commentaire.`
    });
  }
}


exports.deleteComment = async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  //utilisation de deux condition if recupérant le role user et admin 
  if (req.userId == comment.userId || req.userIsAdmin) {
    // mise en place d'un findOne pour lire la base de données grace à son id. 

    Comment.findOne({ where: { id: req.params.id } })
      .then(comment => {
        if (req.file)
        // Suppression de l'image dans le dossier correspondant
        {
          const filename = comment.image.split('/images/')[1];
          fs.unlink(`images/${filename}`)
          const filenameVideo = comment.video.split('/videos/')[1];
          fs.unlink(`videos/${filenameVideo}`)
        }

        //utilisation de Comment.Destroy afin de supprimer l'utilisateur.
        comment.destroy()
          // res.status avec confirmation de la suppression sinon erreur
          .then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
          .catch(error => res.status(400).json({ error }));

      })
      //Renvoie d'une erreur en cas d'erreur lier au premier then
      .catch(error => res.status(500).json({ error }));
  }
  //renvoie erreur 403 pour non autorisation lier aux if permettant de récuperer l'id de l'utilisateur et
  //  savoir si l'utilisateur est admin ou non
  else {
    res.statue(403).send({
      message: `Vous n'êtes pas autorisé à supprimer ce commentaire.`
    });
  }
} 