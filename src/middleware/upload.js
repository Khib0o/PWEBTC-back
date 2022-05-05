var multer = require('multer');
module.exports.image={
    storage:function(){
        var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/images/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
      })
      return storage;
}
}

/*const multer = require("multer");
const imageFilter = (req, file, cb) => {
    cb(null, true);
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "../uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;*/