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

  async getPostBySlug(req, res, next) {
    try {
      const post = await Blog.findOne({ slug: req.params.slug });
      if (!post) {
        return res.status(404).json({ message: 'Post não encontrado' });
      }
      req.post = post;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createPost(req, res) {
    const post = new Blog({
      title: req.body.title,
      slug: req.body.slug,
      content: req.body.content,
      excerpt: req.body.excerpt,
      author: req.body.author,
      date: req.body.date,
      status: req.body.status,
    });

    try {
      const newPost = await post.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updatePost(req, res) {
    Object.assign(req.post, req.body);

    try {
      const updatedPost = await req.post.save();
      res.json(updatedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deletePost(req, res) {
    try {
      await req.post.deleteOne();
      res.json({ message: 'Post deletado com sucesso' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = BlogController;
