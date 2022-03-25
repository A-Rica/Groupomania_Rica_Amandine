const db = require("../models");
const Comment = db.comment;
const fs = require('fs');
const { comment } = require("../models");

//creation d'un commentaire//

exports.createComment = (req, res, next) => {
//mise en place d'une constante regroupant les données enregistrer pour le commentaire. incluant l'userId et le MessageId
  const comment = new Comment({
    text: req.body.text,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    userId: req.params.id,
    messageId: req.body.messageId
    
  });

  comment.save()
  .then(() => res.status(201).json({ ...comment, message: "commentaire crée" }))
  .catch(error => res.status(400).json({ error }));
}

//visualisation des commentaires//

//mise en place du findAll incluant l'utilisateur et le message
exports.getAllComments = (req, res, next) => {
  Comment.findAll({ include: ["user", "message"]} )
    .then(comments => res.status(200).json(comments))
    .catch((error) => {res.status(400).json({ error })
  });
}

exports.modifyComment = (req, res, next) => {
  //
  
  if ( req.body.userId === req.body.id || req.body.role ==="admin"){

  if (req.file) {
     Comment.findOne({where: {id: req.params.id}, include: ["user", "message"]  }) 
 
  .then(comment => {

    const filename = comment.image.split('/images/')[1]; 
     fs.unlinkSync(`images/${filename}`)
  }) 
}  

const commentObject = req.file ?
{
  text: req.body.text,
//mise en lien du fichier image téléchargé.
  image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
} : { ...req.body };
console.log(commentObject); 
//utilisation update afin de mettre a jours les données que l'utilisateur aura modifié. le where servant à dire où chercher.
Comment.update({ ...commentObject, id:  req.params.id}, { where: { id: req.params.id }})
//dans la response 200 ont renvoie la constante crée plus tôt avec les données modifié. dans le cas contraire une erreur 400 apparaitra.
.then(() => res.status(200).json({ ...commentObject}))   
.catch((error) => {res.status(400).json({ error })});
  }
  else{
    res.send({
      message: `Vous n'êtes pas autorisé à modifier ce commentaire.`
    });
  }
}


exports.deleteComment = (req, res) => {

  //utilisation de deux condition if recupérant le role user et admin 
  if (req.body.id ===  req.body.userId || req.body.role === "admin"){
     //utilisation de Comment.Destroy afin de supprimer l'utilisateur.
    Comment.findOne({ where: {id: req.params.id} })
     .then(comment => {
       const filename = comment.image.split('/images/')[1];
       fs.unlink(`images/${filename}`, () => {
         Comment.destroy({where: {id: req.params.id} })
           .then(() => res.status(200).json({ message: 'commentaire supprimé !'}))
           .catch(error => res.status(400).json({ error }));
       });
     })
     .catch(error => res.status(500).json({ error }));
    }
    else{
      res.send({
        message: `Vous n'êtes pas autorisé à supprimer ce commentaire.`
      });
    }
  } 