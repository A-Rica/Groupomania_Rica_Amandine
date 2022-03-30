module.exports = app => {
    const user = require("../controllers/userCtrl");
    const express = require('express');
    const authJwt = require("../middleware/authJwt");
    const multer = require('../middleware/multer-config');
    const router = express.Router();


    //Visionner un profil//
    router.get("/:id", authJwt.verifyToken, multer, user.profil);
    // //Modifier le profil//
    router.put("/:id", authJwt.verifyToken, multer, user.updateProfil);
    // //Supprimer le profil//
    router.delete("/:id", multer, authJwt.verifyToken, user.deleteProfil);

    app.use('/api/profil', router);
}