const db = require("../models");

const User = db.user;
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
const fs = require('fs');
//module de sécurité utilisateur//
const bcrypt = require('bcrypt');
//Regex d'authentification
const Regex_email = new RegExp("^[a-zA-Z0-9. -_]+[@]{1}[a-zA-Z0-9.-_]+$");

// propriété du password

//inscription de l'utilisateur//

exports.signup = (req, res, next) => {

  //Hashage du mot de passe avec bcrypt et récupération des information avec req.body//
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        image: `${req.protocol}://${req.get('host')}/images_default/image-default-user.png`,
        role: req.body.role,
        password: hash,
      });

      //Obligation de remplir les champs demandé avec plusieurs if et des regex//
      if (req.body.email == null || req.body.name == null || req.body.lastname == null || req.body.password == null) {
        return res.status(400).json({ error: 'Champs obligatoire vide!' })
      }
      if (!Regex_email.test(req.body.email)) {
        return res.status(400).json({ error: 'Email invalide' });
      }

      // Sauvegarde de l'utilisateurs + message d'erreur//
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Connexion de l'utilisateur//

exports.login = (req, res, next) => {
  //utilisation de findOne pour visionner les information d'un seul compte avec where et req.body.email
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      //Mise en place de bcrypt compare pour vérifier sur le mot de passe noté et le même que celui enregistré sinon, ca renvoit une erreur
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }

          //Si le mot de passe est identique, renvoit d'une réponse contenant plusieurs donnée,
          // avec un message précisant qu'on est bien connecté ainsi que le token d'identification, sinon erreur
          res.status(200).json({
            userId: user.id,
            email: user.email,
            role: user.role,
            message: 'Vous êtes bien connecté.',
            token: jwt.sign(
              { userId: user.id },
              process.env.TOKEN,
              { expiresIn: '24h' })

          })
        })
    })
    .catch(error => res.status(500).json({ error }));
};
//Déconnection de l'utilisateur
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "Deconnecté"
    });
  } catch (err) {
    this.next(err);
  }
};

//Visualisation du profil//

exports.profil = (req, res, next) => {

  // Utilisation de findOne pour visualiser les information de l'utilisateur avec where et req.params.id
  User.findOne({
    // attributes: ['id', 'nom', 'prenom', 'email', 'image'],
    where: { id: req.userId }, include: ["like", "message"]
  })
    //Si aucune erreur, les informations s'afficherons. Sinon un message apparaitra indiquant que l'utilisateur n'existe pas
    .then(user => {
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(404).json({ error: `L'utilisateur n'existe pas.` });
      }
    }).catch(error => {
      res.status(500).json({ error })
    })
};
//Visionnage de plusieurs profils//
exports.profilAll = (req, res, next) => {
  User.findAll({
    where: { id: { [Op.gt]: 0 } }
  })
    //Utilisation d'un status 200 en renvoyant les messages sinon erreur
    .then(users => res.status(200).json(users))
    .catch((error) => {
      res.status(400).json({ error })
    });
}
//Mise a jours du profil utilisateur
exports.updateProfil = async (req, res) => {
  console.log('ça passe controlleur');
  //utilisation d'une condition if pour comparer l'image déjà existante et celle selectionnée sont identiques ou non. 

  //si elle ne l'es pas, l'ancienne image sera remplacer grace a fs.unlinkSync en récupérant la fin de l'url envoyé lors de la selection de l'image
  // afin que ca correspond au noms du fichier présent dans le dossiers images. 

  //Pour la comparative, utilisation de findOne avec req.params.id pour récuperer les données de l'utilisateurs et ainsi le modifié. 
  if (req.params.id == req.userId || req.userIsAdmin) {

    if (req.file) {
      await User.findOne({ where: { id: req.params.id } })

        .then(user => {
          if (user.image == `${req.protocol}://${req.get('host')}/images_default/image-default-user.png`) {
            return;
          }
          const filename = user.image.split('/images/')[1];
          fs.unlinkSync(`images/${filename}`)
        })
    }

    //mise en place d'un bcrypt sur le mot de passe afin que ce dernier, en cas de modification soit toujours sécurisé.
    bcrypt.hash(req.body.password, 10)

      .then(hash => {

        //Création d'une constante avec les données de l'utilisateurs modifiable. 
        const userObject = req.file ?
          {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            //mise en lien du fichier image téléchargé.
            image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          } : { ...req.body };

        console.log('UserObject', userObject);
        // return res.status(200).end();
        //utilisation update afin de mettre a jours les données que l'utilisateur aura modifié. le where servant à dire où chercher.
        User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
          //dans la response 200 ont renvoie la constante crée plus tôt avec les données modifié. dans le cas contraire une erreur 400 apparaitra.
          .then(() => res.status(200).json({ ...userObject }))
      })
      .catch((error) => { res.status(400).json({ error }) });
  }
  else {
    res.status(500).send({
      message: `Vous n'êtes pas autorisé à modifié ce profil.`
    });
  }
}
//Suppression du fichier. 
exports.deleteProfil = (req, res) => {
  //Mise en place de la suppression du fichier avec un comparatif 
  //permettant de rendre la suppression possible que par l'utilisateur en question et/ou par un administrateur.

  //Création d'une constante récupérantl'id et le role de l'utilisateurs afin de plus tard les supprimer.

  //utilisation de deux condition if recupérant le role user et admin
  if (req.params.id == req.userId || req.userIsAdmin) {

    User.findOne({
      where: { id: req.params.id }
    })
      .then(user => {
        if (req.file) {
          const filename = user.image.split('/images/')[1];
          fs.unlink(`images/${filename}`);
        }
        // utilisation d'User.Destroy afin de supprimer l'utilisateur.
        user.destroy()
          .then((user) => {
            if (user) {
              res.status(200).send({
                message: "Utilisateur supprimé"
              });
            } else {
              res.status(500).send({
                message: `Impossibilité de suppression de l'utilisateur.`
              });
            }
          })
          .catch(error => {
            res.status(500).send({
              error
            });
          })
      })
      //Message d'erreur en cas de soucis. 
      .catch(error => {
        res.status(500).send({
          error
        });
      });
  }
  else {
    res.status(400).json({
      message: `Vous n'êtes pas autorisé à supprimer ce profil.`
    })
  }


}

