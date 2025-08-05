const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['solar', 'wind', 'hydro', 'geothermal', 'biomass', 'nuclear', 'efficiency', 'storage', 'smart-grid', 'other']
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold', 'cancelled'],
    default: 'planning'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  timeline: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    milestones: [{
      title: String,
      description: String,
      dueDate: Date,
      completed: {
        type: Boolean,
        default: false
      },
      completedDate: Date
    }]
  },
  budget: {
    total: {
      type: Number,
      required: true
    },
    spent: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  location: {
    country: {
      type: String,
      required: true
    },
    state: String,
    city: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  team: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['manager', 'engineer', 'analyst', 'consultant', 'contractor']
    },
    responsibilities: [String]
  }],
  specifications: {
    capacity: {
      value: Number,
      unit: {
        type: String,
        enum: ['kW', 'MW', 'GW', 'kWh', 'MWh', 'GWh']
      }
    },
    technology: String,
    efficiency: Number,
    lifespan: Number,
    maintenance: String
  },
  environmental: {
    co2Reduction: Number,
    energySaved: Number,
    renewablePercentage: Number,
    environmentalImpact: String
  },
  images: [{
    url: String,
    caption: String,
    type: {
      type: String,
      enum: ['hero', 'gallery', 'technical', 'progress']
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  documents: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['proposal', 'contract', 'report', 'certification', 'other']
    },
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  featured: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  client: {
    name: String,
    company: String,
    contact: String
  },
  results: {
    actualCapacity: Number,
    actualEfficiency: Number,
    costSavings: Number,
    lessonsLearned: String,
    successMetrics: [{
      metric: String,
      target: Number,
      actual: Number,
      unit: String
    }]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create slug from title before saving
projectSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Index for better query performance
projectSchema.index({ category: 1, status: 1 });
projectSchema.index({ slug: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ createdAt: -1 });

// Virtual for progress percentage
projectSchema.virtual('progressPercentage').get(function() {
  if (!this.timeline.milestones || this.timeline.milestones.length === 0) return 0;
  const completed = this.timeline.milestones.filter(m => m.completed).length;
  return Math.round((completed / this.timeline.milestones.length) * 100);
});

// Virtual for budget utilization
projectSchema.virtual('budgetUtilization').get(function() {
  if (!this.budget.total || this.budget.total === 0) return 0;
  return Math.round((this.budget.spent / this.budget.total) * 100);
});

// Virtual for project duration in days
projectSchema.virtual('durationDays').get(function() {
  if (!this.timeline.startDate || !this.timeline.endDate) return 0;
  const diffTime = Math.abs(this.timeline.endDate - this.timeline.startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

module.exports = mongoose.model('Project', projectSchema);