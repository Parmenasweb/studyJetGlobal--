import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  // General Settings
  siteName: {
    type: String,
    required: [true, 'Site name is required'],
    trim: true,
  },
  siteDescription: {
    type: String,
    trim: true,
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    trim: true,
  },
  timezone: {
    type: String,
    default: 'UTC',
  },
  dateFormat: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  
  // Email Settings
  emailProvider: {
    type: String,
    enum: ['smtp', 'sendgrid', 'mailgun'],
    required: true,
  },
  emailSettings: {
    host: String,
    port: Number,
    username: String,
    password: String,
    apiKey: String,
    domain: String,
  },
  emailTemplates: [{
    name: String,
    subject: String,
    content: String,
    isActive: Boolean,
  }],

  // Notification Settings
  notifications: {
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    applicationUpdates: {
      type: Boolean,
      default: true,
    },
    deadlineReminders: {
      type: Boolean,
      default: true,
    },
    paymentAlerts: {
      type: Boolean,
      default: true,
    },
  },

  // Security Settings
  security: {
    twoFactorAuth: {
      type: Boolean,
      default: false,
    },
    passwordPolicy: {
      minLength: {
        type: Number,
        default: 8,
      },
      requireNumbers: {
        type: Boolean,
        default: true,
      },
      requireSymbols: {
        type: Boolean,
        default: true,
      },
      requireUppercase: {
        type: Boolean,
        default: true,
      },
    },
    sessionTimeout: {
      type: Number,
      default: 3600, // 1 hour in seconds
    },
  },

  // API Settings
  apiKeys: [{
    name: String,
    key: String,
    permissions: [String],
    createdAt: Date,
    lastUsed: Date,
  }],

  // Integration Settings
  integrations: {
    googleAnalytics: {
      enabled: Boolean,
      trackingId: String,
    },
    stripe: {
      enabled: Boolean,
      publicKey: String,
      secretKey: String,
      webhookSecret: String,
    },
    zoom: {
      enabled: Boolean,
      apiKey: String,
      apiSecret: String,
    },
  },

  // Appearance Settings
  appearance: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system',
    },
    primaryColor: {
      type: String,
      default: '#0070f3',
    },
    logo: {
      url: String,
      width: Number,
      height: Number,
    },
    favicon: String,
  },

  // Backup Settings
  backup: {
    autoBackup: {
      type: Boolean,
      default: true,
    },
    backupFrequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'daily',
    },
    retentionDays: {
      type: Number,
      default: 30,
    },
    lastBackup: Date,
  },

  // Audit Trail
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
settingsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure only one settings document exists
settingsSchema.statics.getSettings = async function() {
  const settings = await this.findOne();
  if (settings) return settings;

  // Create default settings if none exist
  return this.create({
    siteName: 'StudyJetGlobal',
    contactEmail: 'admin@studyjetglobal.com',
    emailProvider: 'smtp',
    updatedBy: mongoose.Types.ObjectId(), // Replace with actual admin ID
  });
};

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema); 