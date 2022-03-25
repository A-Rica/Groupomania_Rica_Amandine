module.exports = app => {
    const message = require("../controllers/message");
    const express = require ('express');
    const authJwt = require("../middleware/authJwt");
    const multer = require('../middleware/multer-config');
const router = express.Router();


// //creation post// 
router.post("/:id", authJwt.verifyToken,  multer, message.createMessage);

// // //visionner le message //
router.get("/:id", authJwt.verifyToken, multer, message.getOneMessages);
// //Modifier le message//
router.put("/:id",  authJwt.verifyToken, multer, message.modifyMessage);
// Visionner les messages
router.get("/", authJwt.verifyToken, multer, message.getAllMessages);
// // //Supprimer le profil//
router.delete("/:id", multer, message.deleteMessage);

app.use('/api/messages', router); 
}