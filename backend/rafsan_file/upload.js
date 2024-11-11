const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(process.cwd());
        cb(null, process.cwd());
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: storage,
});

module.exports = upload;