const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadPath = path.join(__dirname, 'uploads/products');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
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
