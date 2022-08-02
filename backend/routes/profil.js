module.exports = app => {
    const user = require("../controllers/userCtrl");
    const express = require('express');
    const authJwt = require("../middleware/authJwt");
    const multer = require('../middleware/multer-config');
    const router = express.Router();


    //Visionner un profil//
    router.get("/me", authJwt.verifyToken, multer.single('image'), user.profil);
    //Visionner plusieurs profil//
    router.get('/', authJwt.verifyToken, user.profilAll);
    // //Modifier le profil//
    router.put("/:id", authJwt.verifyToken, multer.single('image'), user.updateProfil);
    // //Supprimer le profil//
    router.delete("/:id", multer.single('image'), authJwt.verifyToken, user.deleteProfil);

    app.use('/api/profil', router);
}