const multer = require("multer");
const uuid = require("uuid/v1");

const type = {
   "image/png": "png",
   "image/jpg": "jpg",
   "image/jpeg": "jpeg",
};

const fileUpload = multer({
   storage: multer.diskStorage({
      destination: (req, file, cd) => {
         cd(null, "uploads/images");
      },
      filename: (req, file, cd) => {
         const ext = type[file.mimetype];
         cd(null, uuid() + "." + ext);
      },
   }),
});

module.exports = fileUpload;
