const Blog = require('../models/Blog');

class BlogController {
  async getPosts(req, res) {
    try {
      const posts = await Blog.find().sort({ date: -1 });
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getPostById(req, res) {
    try {
      const post = await Blog.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post não encontrado' });
      }
      res.json(post);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createPost(req, res) {
    const post = new Blog({
      ...req.body,
    });

    try {
      const newPost = await post.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updatePost(req, res) {
    try {
      const post = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!post) {
        return res.status(404).json({ message: 'Post não encontrado' });
      }

      res.json(post);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deletePost(req, res) {
    try {
      const post = await Blog.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post não encontrado' });
      }

      await post.deleteOne();
      res.json({ message: 'Post deletado com sucesso' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = BlogController;
