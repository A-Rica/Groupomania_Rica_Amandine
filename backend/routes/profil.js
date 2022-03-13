module.exports = app => {
    const user = require("../controllers/userCtrl");
    const express = require ('express');
    const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();


//Visionner un profil//
router.get("/:id", user.profil);
// //Modifier le profil//
// router.put("/:id", test.update);
// //Supprimer le profil//
// router.delete("/:id", test.delete);

app.use('/api/profil', router);
}