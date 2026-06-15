const multer = require('multer')

const storage = multer.memoryStorage();

const uplaod = multer({ storage });

module.exports = uplaod;