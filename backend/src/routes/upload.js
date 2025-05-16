const express = require('express');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

// Debug route to inspect incoming fields/files
const memoryStorage = multer.memoryStorage();
const uploadAny = multer({ storage: memoryStorage }).any();
router.post('/debug', uploadAny, (req, res) => {
  console.log('>> req.body:', req.body);
  console.log('>> req.files:', req.files);
  return res.status(200).json({ body: req.body, files: req.files });
});

// Main upload route: expects a single file under field named 'image'
const uploadSingle = multer({ storage: memoryStorage }).single('image');
router.post('/', uploadSingle, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhuma imagem enviada' });
  }

  // Create upload stream to Cloudinary
  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: 'trips' },
    (error, result) => {
      if (error) {
        console.error('Erro no upload para Cloudinary:', error);
        return res.status(500).json({ error: 'Falha no upload' });
      }
      // Return public URL and public_id
      res.json({ url: result.secure_url, public_id: result.public_id });
    },
  );

  // Pipe buffer stream to Cloudinary
  streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
});

module.exports = router;
