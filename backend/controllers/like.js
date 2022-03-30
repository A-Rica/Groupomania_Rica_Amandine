const db = require("../models");
const Like = db.like;
const Message = db.message
const fs = require('fs');

//mise en place du système de like pour les messages
exports.likeUsers = async function (req, res, next) {
    // recupération des données du like grace au findOne grace au UserId et messageId
    const liked = await Like.findOne({
        where: { UserId: req.userId, messageId: req.params.id },
    });
    // mise en place d'un condition if avec la constante liked. Si un like existe lier a l'id de l'utilisateur,
    //  on enlève le like grace à un destroy
    if (liked) {
        Like.destroy({ where: { messageId: req.params.id, userId: req.userId } })
            // res status 200 informant que le like est supprimé, sinon erreur
            .then(() => res.status(200).send({
                message: "like supprimé"
            }))

            .catch(error => res.status(500).json({ error }));

        // création du like dans un else
    } else {
        const message = await Message.findOne({ where: { id: req.params.id }, include: ["user"] });

        // constante user récupérant l'id de l'utilisateur, le nom ainsi que le prenom dans un array
        const user = [message.user.id,
        message.user.lastname,
        message.user.name
        ]
        // constante like pour crée le like avec l'id du message et de l'utilisateurs
        const like = new Like({
            messageId: req.params.id,
            userId: req.userId
        });
        // sauvegarde du like
        like.save()
            // message annocant que le message est bien liké, sinon erreur.
            .then(() => res.status(201).json({ ...user, message: "vous avez bien liké ce message" }))
            .catch(error => res.status(500).json({ error }));
    }

}