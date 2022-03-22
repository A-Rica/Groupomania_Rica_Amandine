module.exports = app => {
    const messages = require("../controllers/post");
    const express = require ('express');
    const authJwt = require("../middleware/authJwt");
    const multer = require('../middleware/multer-config');
const router = express.Router();


// //creation post// 
router.post("/", authJwt.verifyToken,  multer, messages.createMessage);

// // //visionner le message //
router.get("/:id", authJwt.verifyToken, multer, messages.getOneMessages);
// //Modifier le profil//
// router.put("/:id",  authJwt.verifyToken, multer, user.updateProfil);
// // //Supprimer le profil//
// router.delete("/:id", multer, user.deleteProfil);

app.use('/api/messages', router); 
}