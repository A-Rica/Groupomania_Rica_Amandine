const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'video/mp4': 'mp4',
    'video/wmg': 'wmg',
    'video/flv': 'flv',
    'video/avi': 'avi'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
        // console.log('req multer configg', req.file);
    },
    filename: (req, file, callback) => {
        // console.log(req.file);
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
module.exports = multer({ storage }).single('image');

