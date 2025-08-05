const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = { isPublic: true };
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.featured) {
      filter.featured = req.query.featured === 'true';
    }
    
    if (req.query.country) {
      filter['location.country'] = new RegExp(req.query.country, 'i');
    }

    // Search functionality
    if (req.query.search) {
      filter.$or = [
        { title: new RegExp(req.query.search, 'i') },
        { description: new RegExp(req.query.search, 'i') },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } }
      ];
    }

    const projects = await Project.find(filter)
      .populate('createdBy', 'name company')
      .populate('team.user', 'name email')
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments(filter);

    res.json({
      success: true,
      data: projects,
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

// @route   GET /api/projects/featured
// @desc    Get featured projects
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true, isPublic: true })
      .populate('createdBy', 'name company')
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/projects/stats
// @desc    Get project statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const stats = await Project.aggregate([
      { $match: { isPublic: true } },
      {
        $group: {
          _id: null,
          totalProjects: { $sum: 1 },
          totalBudget: { $sum: '$budget.total' },
          avgBudget: { $avg: '$budget.total' },
          completedProjects: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          inProgressProjects: {
            $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
          }
        }
      }
    ]);

    const categoryStats = await Project.aggregate([
      { $match: { isPublic: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalBudget: { $sum: '$budget.total' },
          avgBudget: { $avg: '$budget.total' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const statusStats = await Project.aggregate([
      { $match: { isPublic: true } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        totalProjects: 0,
        totalBudget: 0,
        avgBudget: 0,
        completedProjects: 0,
        inProgressProjects: 0
      },
      categoryStats,
      statusStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/projects/:slug
// @desc    Get single project by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug })
      .populate('createdBy', 'name company email')
      .populate('team.user', 'name email company position');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.isPublic && (!req.user || req.user.id !== project.createdBy._id.toString())) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/projects
// @desc    Create project
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      createdBy: req.user.id
    });

    await project.save();
    await project.populate('createdBy', 'name company');

    res.status(201).json({
      success: true,
      data: project
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

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check ownership or admin role
    if (project.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name company');

    res.json({
      success: true,
      data: project
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

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check ownership or admin role
    if (project.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/projects/:id/milestone/:milestoneId
// @desc    Update project milestone
// @access  Private
router.put('/:id/milestone/:milestoneId', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check ownership or admin role
    if (project.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const milestone = project.timeline.milestones.id(req.params.milestoneId);
    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    // Update milestone
    Object.assign(milestone, req.body);
    
    if (req.body.completed && !milestone.completedDate) {
      milestone.completedDate = new Date();
    } else if (!req.body.completed) {
      milestone.completedDate = undefined;
    }

    await project.save();

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/projects/my/projects
// @desc    Get current user's projects
// @access  Private
router.get('/my/projects', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const projects = await Project.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments({ createdBy: req.user.id });

    res.json({
      success: true,
      data: projects,
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