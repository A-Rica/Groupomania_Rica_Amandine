module.exports = app => {
    const express = require('express');
const images = require('../controllers/image');
const multer = require('../middleware/multer-config');
const auth  = require('../middleware/authJwt');

const router = express.Router();

router.post('/uploads',auth.verifyToken, multer, images.upload);

app.use('/api/images', router);
}