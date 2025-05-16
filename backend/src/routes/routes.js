const express = require('express');
const router = express.Router();

const TripController = require('../controllers/TripController');
const BlogController = require('../controllers/BlogController');

const tripController = new TripController();
const blogController = new BlogController();

// Rotas para viagens
router.get('/trips', tripController.getTrips);
router.get('/trips/:id', tripController.getTripById);
router.post('/trips', tripController.createTrip);
router.put('/trips/:id', tripController.updateTrip);
router.delete('/trips/:id', tripController.deleteTrip);

// Rotas para posts
router.get('/posts', blogController.getPosts);
router.get('/posts/:slug', blogController.getPostBySlug, (req, res) => {
  res.json(req.post);
});
router.post('/posts', blogController.createPost);
router.put(
  '/posts/:slug',
  blogController.getPostBySlug,
  blogController.updatePost,
);
router.delete(
  '/posts/:slug',
  blogController.getPostBySlug,
  blogController.deletePost,
);

module.exports = router;
