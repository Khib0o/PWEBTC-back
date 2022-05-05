var multer  = require('multer');
var imageMiddleware= require('./upload');
var imageModel= require('../models/image.model');

module.exports={
    imageUploadForm:function(req,res){
        res.render('upload-form');
     },
     storeImage:function(req,res){
        var upload = multer({
                    storage: imageMiddleware.image.storage(), 
                    allowedImage:imageMiddleware.image.allowedImage 
                    }).single('image');
        upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
              res.send(err);
           } else if (err) {
              res.send(err);
           }else{
              // store image in database
               var imageName = req.file.originalname;
               var inputValues = {
                  image_name: imageName
               }
             // call model
             imageModel.storeImage(inputValues, function(data){
               res.render('upload-form',{alertMsg:data})
             })
              
           }
           
        })
        
     }
}