module.exports = app => {
    const user = require("../controllers/profil");
    const express = require ('express');
const router = express.Router();


app.use('/api/profil', router);
}