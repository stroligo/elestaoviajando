import { v2 as cloudinary } from 'cloudinary';

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: 'drn1sflf0',
    api_key: '173892186243617',
    api_secret:
      'CLOUDINARY_URL=cloudinary://173892186243617:X3H1bQXKeo_FDmS0Q1ayCgFFcRQ@drn1sflf0',
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
      {
        public_id: 'shoes',
      },
    )
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url('shoes', {
    fetch_format: 'auto',
    quality: 'auto',
  });

  console.log(optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url('shoes', {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
  });

  console.log(autoCropUrl);
})();
