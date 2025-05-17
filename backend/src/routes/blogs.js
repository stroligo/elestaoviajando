const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Listar todos os blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Buscar um blog específico
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog não encontrado' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar um novo blog
router.post('/', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    excerpt: req.body.excerpt,
    author: req.body.author,
    date: req.body.date,
    status: req.body.status,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar um blog
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog não encontrado' });
    }

    Object.assign(blog, req.body);
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar um blog
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog não encontrado' });
    }

    await blog.deleteOne();
    res.json({ message: 'Blog deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
