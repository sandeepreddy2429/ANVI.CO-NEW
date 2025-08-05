const mongoose = require('mongoose');

const energyDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['solar', 'wind', 'hydro', 'geothermal', 'biomass', 'nuclear', 'fossil', 'other']
  },
  energyType: {
    type: String,
    required: [true, 'Please specify energy type'],
    enum: ['renewable', 'non-renewable', 'hybrid']
  },
  capacity: {
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ['MW', 'GW', 'kW', 'TW'],
      default: 'MW'
    }
  },
  efficiency: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  location: {
    country: {
      type: String,
      required: true
    },
    state: String,
    city: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  dataPoints: [{
    date: {
      type: Date,
      required: true
    },
    production: {
      type: Number,
      required: true
    },
    consumption: {
      type: Number,
      default: 0
    },
    efficiency: {
      type: Number,
      min: 0,
      max: 100
    }
  }],
  images: [{
    url: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  tags: [String],
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance', 'planned'],
    default: 'active'
  },
  owner: {
    type: String,
    default: 'Public'
  },
  cost: {
    initial: Number,
    maintenance: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  environmental: {
    co2Reduction: Number,
    waterUsage: Number,
    landUsage: Number
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
energyDataSchema.index({ category: 1, energyType: 1 });
energyDataSchema.index({ 'location.country': 1 });
energyDataSchema.index({ status: 1 });
energyDataSchema.index({ createdAt: -1 });

// Virtual for total production
energyDataSchema.virtual('totalProduction').get(function() {
  return this.dataPoints.reduce((total, point) => total + point.production, 0);
});

// Virtual for average efficiency
energyDataSchema.virtual('averageEfficiency').get(function() {
  if (this.dataPoints.length === 0) return 0;
  const total = this.dataPoints.reduce((sum, point) => sum + (point.efficiency || 0), 0);
  return total / this.dataPoints.length;
});

module.exports = mongoose.model('EnergyData', energyDataSchema);