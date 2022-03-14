module.exports = app => {
    const user = require("../controllers/userCtrl");
    const express = require ('express');
    const auth = require("../middleware/authJwt")
const multer = require('../middleware/multer-config');
const router = express.Router();


//Visionner un profil//
router.get("/:id",auth.verifyToken, user.profil);
// //Modifier le profil//
router.put("/:id", multer,  user.updateProfil);
// //Supprimer le profil//
// router.delete("/:id", test.delete);

app.use('/api/profil', router);
}