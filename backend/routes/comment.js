module.exports = app => {
    const comment = require("../controllers/comment");
    const express = require('express');
    const authJwt = require("../middleware/authJwt");
    const multer = require('../middleware/multer-config');
    const cpUpload = multer.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }])
    const router = express.Router();

    // //creation commentaire// 
    router.post("/", authJwt.verifyToken, cpUpload, comment.createComment);
    //visualisation des commentaires//
    router.get("/", authJwt.verifyToken, cpUpload, comment.getAllComments);
    //modification du commentaire
    router.put("/:id", authJwt.verifyToken, cpUpload, comment.modifyComment);
    //suppression du commentaire
    router.delete("/:id", authJwt.verifyToken, cpUpload, comment.deleteComment);
    app.use('/api/comment', router);
}