const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');

const TripController = require('../controllers/TripController');
const BlogController = require('../controllers/BlogController');

const tripController = new TripController();
const blogController = new BlogController();

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
