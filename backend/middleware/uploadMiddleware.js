const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '../uploads');
const screenshotsDir = path.join(uploadDir, 'screenshots');
const zipsDir = path.join(uploadDir, 'zips');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);
if (!fs.existsSync(zipsDir)) fs.mkdirSync(zipsDir);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === 'screenshots') {
      cb(null, screenshotsDir);
    } else if (file.fieldname === 'zipFile') {
      cb(null, zipsDir);
    } else {
      cb(null, uploadDir);
    }
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  if (file.fieldname === 'screenshots') {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Images only!');
    }
  } else if (file.fieldname === 'zipFile') {
    const filetypes = /zip|rar|7z/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = file.mimetype === 'application/zip' || file.mimetype === 'application/x-zip-compressed';
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('ZIP/Archive files only!');
    }
  } else {
    cb('Unexpected field');
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
