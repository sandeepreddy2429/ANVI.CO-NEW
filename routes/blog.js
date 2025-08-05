const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

const router = express.Router();

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    maxlength: [300, 'Excerpt cannot be more than 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide content']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['renewable-energy', 'solar', 'wind', 'hydro', 'energy-efficiency', 'sustainability', 'technology', 'news', 'case-studies', 'tips']
  },
  tags: [String],
  featuredImage: {
    url: String,
    alt: String,
    caption: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: Number, // in minutes
    default: 5
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    email: String,
    content: String,
    approved: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  publishedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create slug from title before saving
blogPostSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Calculate read time based on content
blogPostSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

// Index for better query performance
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ category: 1, status: 1 });
blogPostSchema.index({ featured: 1, status: 1 });
blogPostSchema.index({ publishedAt: -1 });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// @route   GET /api/blog
// @desc    Get all published blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = { status: 'published' };
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.featured) {
      filter.featured = req.query.featured === 'true';
    }
    
    if (req.query.tags) {
      filter.tags = { $in: req.query.tags.split(',') };
    }

    // Search functionality
    if (req.query.search) {
      filter.$or = [
        { title: new RegExp(req.query.search, 'i') },
        { excerpt: new RegExp(req.query.search, 'i') },
        { content: new RegExp(req.query.search, 'i') },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } }
      ];
    }

    const posts = await BlogPost.find(filter)
      .populate('author', 'name company avatar')
      .select('-content') // Exclude full content for list view
      .sort({ featured: -1, publishedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await BlogPost.countDocuments(filter);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/featured
// @desc    Get featured blog posts
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const posts = await BlogPost.find({ featured: true, status: 'published' })
      .populate('author', 'name company avatar')
      .select('-content')
      .sort({ publishedAt: -1 })
      .limit(3);

    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/categories
// @desc    Get blog categories with post counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await BlogPost.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/:slug
// @desc    Get single blog post by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, status: 'published' })
      .populate('author', 'name company avatar email')
      .populate('comments.user', 'name avatar');

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blog
// @desc    Create blog post
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const post = new BlogPost({
      ...req.body,
      author: req.user.id
    });

    await post.save();
    await post.populate('author', 'name company avatar');

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blog/:id
// @desc    Update blog post
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check ownership or admin role
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'name company avatar');

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/blog/:id
// @desc    Delete blog post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check ownership or admin role
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await BlogPost.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blog/:id/like
// @desc    Like/unlike blog post
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if user already liked the post
    const existingLike = post.likes.find(like => like.user.toString() === req.user.id);

    if (existingLike) {
      // Remove like
      post.likes = post.likes.filter(like => like.user.toString() !== req.user.id);
    } else {
      // Add like
      post.likes.push({ user: req.user.id });
    }

    await post.save();

    res.json({
      success: true,
      liked: !existingLike,
      likesCount: post.likes.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blog/:id/comment
// @desc    Add comment to blog post
// @access  Public
router.post('/:id/comment', async (req, res) => {
  try {
    const { name, email, content } = req.body;

    if (!name || !email || !content) {
      return res.status(400).json({ message: 'Please provide name, email, and content' });
    }

    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const comment = {
      name,
      email,
      content,
      user: req.user ? req.user.id : null,
      approved: false // Comments need approval
    };

    post.comments.push(comment);
    await post.save();

    res.json({
      success: true,
      message: 'Comment submitted successfully. It will be visible after approval.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blog/:id/comment/:commentId/approve
// @desc    Approve comment (Admin only)
// @access  Private/Admin
router.put('/:id/comment/:commentId/approve', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    comment.approved = true;
    await post.save();

    res.json({
      success: true,
      message: 'Comment approved successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/my/posts
// @desc    Get current user's blog posts
// @access  Private
router.get('/my/posts', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find({ author: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await BlogPost.countDocuments({ author: req.user.id });

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;