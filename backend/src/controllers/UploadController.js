const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');

class UploadController {
  // Upload de imagem
  async uploadImage(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada' });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'trips' },
      (error, result) => {
        if (error) {
          console.error('Erro no upload para Cloudinary:', error);
          return res.status(500).json({ error: 'Falha no upload' });
        }
        res.json({ url: result.secure_url, public_id: result.public_id });
      },
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  }
}

module.exports = UploadController;
