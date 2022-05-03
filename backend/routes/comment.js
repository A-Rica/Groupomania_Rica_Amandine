module.exports = app => {
    const comment = require("../controllers/comment");
    const express = require('express');
    const authJwt = require("../middleware/authJwt");
    const multer = require('../middleware/multer-config');
    const router = express.Router();

    // //creation commentaire// 
    router.post("/", authJwt.verifyToken, multer, comment.createComment);
    //visualisation des commentaires//
    router.get("/", authJwt.verifyToken, multer, comment.getAllComments);
    //modification du commentaire
    router.put("/:id", authJwt.verifyToken, multer, comment.modifyComment);
    //suppression du commentaire
    router.delete("/:id", multer, comment.deleteComment);
    app.use('/api/comment', router);
}