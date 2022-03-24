module.exports = app => {
    const messages = require("../controllers/message");
    const express = require ('express');
    const authJwt = require("../middleware/authJwt");
    const multer = require('../middleware/multer-config');
const router = express.Router();


// //creation post// 
router.post("/:id", authJwt.verifyToken,  multer, messages.createMessage);

// // //visionner le message //
router.get("/:id", authJwt.verifyToken, multer, messages.getOneMessages);
// //Modifier le message//
router.put("/:id",  authJwt.verifyToken, multer, messages.modifyMessage);
// Visionner les messages
router.get("/", authJwt.verifyToken, multer, messages.getAllMessages);
// // //Supprimer le profil//
router.delete("/:id", multer, messages.deleteMessage);

app.use('/api/messages', router); 
}