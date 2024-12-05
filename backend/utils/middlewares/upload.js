const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let BASE_URL = `${req.protocol}://${req.get('host')}`

        cb(null, `${BASE_URL}/uploads/products`);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpg|jpeg|png/;
        const isMimeTypeValid = fileTypes.test(file.mimetype);
        const isExtNameValid = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (isMimeTypeValid && isExtNameValid) {
            return cb(null, true);
        }
        cb(new Error("Only images (jpg, jpeg, png) are allowed"));
    }
});

module.exports = upload;
