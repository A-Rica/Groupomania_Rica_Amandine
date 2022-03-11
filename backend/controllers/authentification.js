const db = require("../models");
const Users = db.users;
//module de sécurité utilisateur//
const bcrypt = require ('bcrypt');


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
                token: process.env.TOKEN,
                message: 'Vous êtes bien connecté.'
              });
  })
.catch(error => res.status(500).json({ error }));                             
})
.catch(error => res.status(500).json({ error }));   
 };
 