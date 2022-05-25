const db = require("../models");
const Like = db.like;
const Message = db.message
const fs = require('fs');

//mise en place du système de like pour les messages
exports.likeUsers = async function (req, res, next) {
    const message = await Message.findByPk(req.params.id);
    // console.log(message.userLiked);
    // // recupération des données du like grace au findOne grace au UserId et messageId
    const liked = await Like.findOne({
        where: { UserId: req.userId, messageId: message.id },
    });


    // mise en place d'un condition if avec la constante liked. Si un like existe lier a l'id de l'utilisateur,
    //  on enlève le like grace à un destroy
    if (liked) {

        Like.destroy({ where: { messageId: req.params.id, userId: req.userId }, include: ["message"] })
            // res status 200 informant que le like est supprimé, sinon erreur
            .then((
            ) => {

                res.status(200).send({
                    ...liked,
                    message: "like supprimé"
                })
            }

            )

            .catch(error => res.status(500).json({ error }));

        // création du like dans un else
    } else {
        // constante like pour crée le like avec l'id du message et de l'utilisateurs
        const like = new Like({
            messageId: req.params.id,
            userId: req.userId,
            userLiked: true
        });

        // sauvegarde du like
        like.save()
            // message annocant que le message est bien liké, sinon erreur.
            .then(message => {
                console.log(message);

                res.status(201).json({
                    ...like,
                    message: "vous avez bien liké ce message"
                })
            })
            .catch(error => res.status(500).json({ error }));
    }

}

