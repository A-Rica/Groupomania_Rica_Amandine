module.exports = app => {
    const user = require("../controllers/userCtrl");
    const auth = require("../middleware/authJwt");
    const password = require('../middleware/password')
    const express = require('express');

    const router = express.Router();

    router.post('/signup', password, user.signup);
    router.post('/login', user.login);
    router.post('/signout', user.signout);

    app.use('/api/auth', router);
}    