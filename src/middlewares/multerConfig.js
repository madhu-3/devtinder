const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    const extension = path.extname(file.originalname);
    const newFilename = `${originalName}_${timestamp}${extension}`;
    cb(null, newFilename);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  if (extname) {
    cb(null, true);
  } else {
    cb(new Error("Only Images are allowed!"), false);
  }
};
const upload = multer({
  storage,
  limits: { fieldSize: 5 * 1024 * 1024 },
  fileFilter,
});
module.exports = upload;
