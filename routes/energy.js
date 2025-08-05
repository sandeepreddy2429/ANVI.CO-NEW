const express = require('express');
const EnergyData = require('../models/EnergyData');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/energy
// @desc    Get all energy data
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
    
    if (req.query.energyType) {
      filter.energyType = req.query.energyType;
    }
    
    if (req.query.status) {
      filter.status = req.query.status;
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

    const energyData = await EnergyData.find(filter)
      .populate('createdBy', 'name company')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await EnergyData.countDocuments(filter);

    res.json({
      success: true,
      data: energyData,
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

// @route   GET /api/energy/stats
// @desc    Get energy statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const stats = await EnergyData.aggregate([
      { $match: { isPublic: true } },
      {
        $group: {
          _id: null,
          totalProjects: { $sum: 1 },
          totalCapacity: { $sum: '$capacity.value' },
          avgEfficiency: { $avg: '$efficiency' },
          renewableCount: {
            $sum: { $cond: [{ $eq: ['$energyType', 'renewable'] }, 1, 0] }
          },
          nonRenewableCount: {
            $sum: { $cond: [{ $eq: ['$energyType', 'non-renewable'] }, 1, 0] }
          }
        }
      }
    ]);

    const categoryStats = await EnergyData.aggregate([
      { $match: { isPublic: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalCapacity: { $sum: '$capacity.value' },
          avgEfficiency: { $avg: '$efficiency' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const countryStats = await EnergyData.aggregate([
      { $match: { isPublic: true } },
      {
        $group: {
          _id: '$location.country',
          count: { $sum: 1 },
          totalCapacity: { $sum: '$capacity.value' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        totalProjects: 0,
        totalCapacity: 0,
        avgEfficiency: 0,
        renewableCount: 0,
        nonRenewableCount: 0
      },
      categoryStats,
      countryStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/energy/:id
// @desc    Get single energy data
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const energyData = await EnergyData.findById(req.params.id)
      .populate('createdBy', 'name company email');

    if (!energyData) {
      return res.status(404).json({ message: 'Energy data not found' });
    }

    if (!energyData.isPublic && (!req.user || req.user.id !== energyData.createdBy._id.toString())) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      success: true,
      data: energyData
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Energy data not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/energy
// @desc    Create energy data
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const energyData = new EnergyData({
      ...req.body,
      createdBy: req.user.id
    });

    await energyData.save();
    await energyData.populate('createdBy', 'name company');

    res.status(201).json({
      success: true,
      data: energyData
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

// @route   PUT /api/energy/:id
// @desc    Update energy data
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let energyData = await EnergyData.findById(req.params.id);

    if (!energyData) {
      return res.status(404).json({ message: 'Energy data not found' });
    }

    // Check ownership or admin role
    if (energyData.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    energyData = await EnergyData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name company');

    res.json({
      success: true,
      data: energyData
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

// @route   DELETE /api/energy/:id
// @desc    Delete energy data
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const energyData = await EnergyData.findById(req.params.id);

    if (!energyData) {
      return res.status(404).json({ message: 'Energy data not found' });
    }

    // Check ownership or admin role
    if (energyData.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await EnergyData.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Energy data deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/energy/:id/datapoint
// @desc    Add data point to energy data
// @access  Private
router.post('/:id/datapoint', auth, async (req, res) => {
  try {
    const energyData = await EnergyData.findById(req.params.id);

    if (!energyData) {
      return res.status(404).json({ message: 'Energy data not found' });
    }

    // Check ownership or admin role
    if (energyData.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    energyData.dataPoints.push(req.body);
    await energyData.save();

    res.json({
      success: true,
      data: energyData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/energy/my/data
// @desc    Get current user's energy data
// @access  Private
router.get('/my/data', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const energyData = await EnergyData.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await EnergyData.countDocuments({ createdBy: req.user.id });

    res.json({
      success: true,
      data: energyData,
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