const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    hashtag: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    thumbnail: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'elestaoviajando.blog',
  },
);

module.exports = mongoose.model('Blog', blogSchema);
