module.exports = app => {
    const user = require("../controllers/userCtrl");
    const verifyRole  = require("../middleware/verifyRole");
    const auth = require("../middleware/authJwt")
    const express = require ('express');
const router = express.Router();

router.post('/signup',[verifyRole.checkRolesExisted], user.signup);
router.post('/login', user.login);
router.post('/signout', user.signout);

app.use('/api/auth', router);
}  