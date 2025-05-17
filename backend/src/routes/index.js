const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth, adminAuth } = require('../middleware/auth');
const TripController = require('../controllers/TripController');
const BlogController = require('../controllers/BlogController');
const AuthController = require('../controllers/AuthController');
const UploadController = require('../controllers/UploadController');

const tripController = new TripController();
const blogController = new BlogController();
const authController = new AuthController();
const uploadController = new UploadController();

// ==========================================
// Configuração do Multer para Upload
// ==========================================
const memoryStorage = multer.memoryStorage();
const uploadSingle = multer({ storage: memoryStorage }).single('image');

// ==========================================
// Rotas de Autenticação
// ==========================================
router.post('/auth/register', authController.register.bind(authController));
router.post('/auth/login', authController.login.bind(authController));
router.get(
  '/auth/me',
  auth,
  authController.getCurrentUser.bind(authController),
);

// ==========================================
// Rotas de Upload
// ==========================================
router.post(
  '/upload',
  uploadSingle,
  uploadController.uploadImage.bind(uploadController),
);

// ==========================================
// Rotas de Viagens
// ==========================================
// Rotas públicas
router.get('/trips', tripController.getTrips);
router.get('/trips/:id', tripController.getTripById);
router.get('/posts', blogController.getPosts);
router.get('/posts/:id', blogController.getPostById);

// Rotas protegidas (apenas admin)
router.post('/trips', adminAuth, tripController.createTrip);
router.put('/trips/:id', adminAuth, tripController.updateTrip);
router.delete('/trips/:id', adminAuth, tripController.deleteTrip);

router.post('/posts', adminAuth, blogController.createPost);
router.put('/posts/:id', adminAuth, blogController.updatePost);
router.delete('/posts/:id', adminAuth, blogController.deletePost);

module.exports = router;
