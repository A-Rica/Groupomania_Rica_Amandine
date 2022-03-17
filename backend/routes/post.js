module.exports = app => {
    const message = require("../controllers/post");
    const express = require ('express');
    const authJwt = require("../middleware/authJwt");
    const multer = require('../middleware/multer-config');
const router = express.Router();


//creation post//
router.post("/:id", authJwt.verifyToken,  multer, message.createMessage);

//visionner le message //
router.get("/:id", authJwt.verifyToken, multer, message.getOneMessage);
// //Modifier le profil//
// router.put("/:id",  authJwt.verifyToken, multer, user.updateProfil);
// // //Supprimer le profil//
// router.delete("/:id", multer, user.deleteProfil);

app.use('/api/message', router);
}