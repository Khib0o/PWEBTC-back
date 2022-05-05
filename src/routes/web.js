const express = require('express');
const router = express.Router();
const imageController= require('../middleware/image-controller');

router.get('/api/upload',imageController.imageUploadForm);

router.post('/api/upload',imageController.storeImage);

module.exports = router;