import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'expense-approval-required',
      'expense-approved',
      'expense-rejected',
      'income-verification-required',
      'income-verified',
      'income-rejected',
      'approval-reminder',
      'high-value-transaction'
    ]
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  data: {
    transactionId: String,
    amount: Number,
    currency: String,
    category: String,
    approver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'archived'],
    default: 'unread'
  },
  actionRequired: {
    type: Boolean,
    default: false
  },
  actionUrl: String,
  expiresAt: Date,
  readAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 24 * 60 * 60 // Auto-delete after 30 days
  }
});

// Indexes
notificationSchema.index({ userId: 1, status: 1 });
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ type: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Methods
notificationSchema.methods.markAsRead = async function() {
  this.status = 'read';
  this.readAt = new Date();
  await this.save();
  return this;
};

notificationSchema.methods.archive = async function() {
  this.status = 'archived';
  await this.save();
  return this;
};

// Static methods
notificationSchema.statics.createApprovalNotification = async function({
  userId,
  type,
  transactionId,
  amount,
  currency,
  category,
  approver,
  reason
}) {
  const notification = new this({
    userId,
    type,
    title: this.getNotificationTitle(type),
    message: this.getNotificationMessage({
      type,
      amount: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'USD'
      }).format(amount),
      category
    }),
    data: {
      transactionId,
      amount,
      currency,
      category,
      approver,
      reason
    },
    priority: amount >= 5000 ? 'urgent' : 'high',
    actionRequired: type.includes('required'),
    actionUrl: `/private/dashboard/finance/${type.includes('expense') ? 'expense' : 'income'}/${transactionId}`
  });

  if (type.includes('required')) {
    notification.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  }

  await notification.save();
  return notification;
};

notificationSchema.statics.getNotificationTitle = function(type) {
  const titles = {
    'expense-approval-required': 'Expense Approval Required',
    'expense-approved': 'Expense Approved',
    'expense-rejected': 'Expense Rejected',
    'income-verification-required': 'Income Verification Required',
    'income-verified': 'Income Verified',
    'income-rejected': 'Income Rejected',
    'approval-reminder': 'Approval Reminder',
    'high-value-transaction': 'High Value Transaction Alert'
  };
  return titles[type] || 'Finance Notification';
};

notificationSchema.statics.getNotificationMessage = function({ type, amount, category }) {
  const messages = {
    'expense-approval-required': `A new expense of ${amount} for ${category} requires your approval.`,
    'expense-approved': `Your expense of ${amount} for ${category} has been approved.`,
    'expense-rejected': `Your expense of ${amount} for ${category} has been rejected.`,
    'income-verification-required': `A new income entry of ${amount} for ${category} requires verification.`,
    'income-verified': `Income entry of ${amount} for ${category} has been verified.`,
    'income-rejected': `Income entry of ${amount} for ${category} has been rejected.`,
    'approval-reminder': `You have pending approvals that require your attention.`,
    'high-value-transaction': `A high value transaction of ${amount} has been created.`
  };
  return messages[type] || 'Please review the transaction details.';
};

// Middleware to send push notifications
notificationSchema.post('save', async function(doc) {
  try {
    // TODO: Implement push notification service
    // await sendPushNotification({
    //   userId: doc.userId,
    //   title: doc.title,
    //   body: doc.message,
    //   data: {
    //     notificationId: doc._id,
    //     type: doc.type,
    //     actionUrl: doc.actionUrl
    //   }
    // });
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
export default Notification; 