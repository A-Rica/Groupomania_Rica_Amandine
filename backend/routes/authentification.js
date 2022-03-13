module.exports = app => {
    const user = require("../controllers/userCtrl");
    const express = require ('express');
const router = express.Router();

router.post('/signup', user.signup);
router.post('/login', user.login);

app.use('/api/auth', router);
}