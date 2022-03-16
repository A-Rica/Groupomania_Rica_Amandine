const db = require("../models");
const Users = db.users;
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
const fs = require('fs');

//module de sécurité utilisateur//
const bcrypt = require ('bcrypt');
//Regex d'authentification
const Regex_email = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+$");
const Regex_password = new RegExp("^[a-zA-Z0-9]{3,14}$");

//inscription de l'utilisateur//

exports.signup = (req, res, next) => {

  bcrypt.hash(req.body.mot_de_passe, 10)
  .then( hash => {
        const users = new Users({
          nom: req.body.nom,
          prenom: req.body.prenom,
          email: req.body.email, 
          mot_de_passe: hash
        });

        if (req.body.email == null || req.body.nom == null || req.body.prenom == null || req.body.mot_de_passe == null) {
          return res.status(400).json( {error: 'Champs obligatoire vide!'})
      }
if(!Regex_email.test(req.body.email)){
return res.status(400).json({ error: 'Email invalide'});
}
if(!Regex_password.test(req.body.mot_de_passe)){
  return res.status(400).json({ error: 'Mot de passe invalide'}); 
}
        users.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  //Connexion de l'utilisateur//

 exports.login = (req, res, next) => {
 
Users.findOne ({ where: {email: req.body.email} })
.then( users => {
  if (!users) {
    return res.status(401).json({ error: 'Utilisateur non trouvé !' });
  }
  bcrypt.compare(req.body.mot_de_passe, users.mot_de_passe)
  .then(valid => {
    if (!valid) {
      return res.status(401).json({ error: 'Mot de passe incorrect !' });
    }
 
    res.status(200).json({
      usersId: users.id,
      email: users.email,
      message: 'Vous êtes bien connecté.',
      token: jwt.sign(
         { userId: users.id}, 
         process.env.TOKEN, 
         { expiresIn: '24h' } )
     
    }) 
  })
.catch(error => res.status(500).json({ error }));                             
})
.catch(error => res.status(500).json({ error })); 

 };
 
 //Visionnage du profil//

 exports.profil = (req, res, next) => {

Users.findOne({
  attributes: ['id', 'nom', 'prenom', 'email', 'avatar'],
  where: {id:  req.params.id}
})
.then(users => {
  if(users) {
    res.status(201).json(users);
  } else {
    res.status(404).json( { error: `L'utilisateur n'existe pas.` });
  }
}). catch(err => {
  res.status(500).json ({ error })
})
}; 

exports.updateProfil = (req, res) => {
  // if (req.file) { Users.findOne({attributes: ['avatar'],
  //  where: { id: req.params.id} })
  // .then(users => {
  //   const filename = users.image.split('/images/')[1];
  //    fs.unlinkSync(`images/${filename}`)
  // }) } 

  const usersObject = req.file ?
        {
            ...req.params.id,
            image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ... req.body}

        bcrypt.hash(req.body.mot_de_passe, 10)
  .then( hash => {
    Users.update({
       nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email, 
      admin: req.body.admin,
      mot_de_passe: hash,
       id:  req.params.id}, { where: { id: req.params.id }})
    res.status(200).json({
 ...usersObject }) })
      .catch(error => res.status(400).json({ error }))
}

exports.deleteProfil = (req, res) => {
  const id = req.params.id;
    Users.destroy({
      where: { id: id }
    })
      .then(users => {
        if (users) {
          res.send({
            message: "Utilisateurs supprimé"
          });
        } else {
          res.send({
            message: `Impossibilité de suppression de l'utilisateur.`
          });
        }
      })
      .catch(error => {
        res.status(500).send({
          error
        });
      });
    }