import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  replies: [{
    content: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverImage: {
    url: String,
    alt: String,
    caption: String
  },
  category: {
    type: String,
    required: true,
    enum: ["Study Abroad Guide", "Student Reviews", "Travel Tips", "Events & Updates", "FAQs", "Scholarships", "Visa Guide", "University Spotlights"]
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String
  },
  readTime: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [commentSchema],
  relatedPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'BlogPost'
  }]
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
blogPostSchema.index({ slug: 1 }, { unique: true });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ tags: 1 });
blogPostSchema.index({ status: 1 });
blogPostSchema.index({ createdAt: -1 });

// Virtual for comment count
blogPostSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Virtual for like count
blogPostSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Pre-save middleware to generate slug if not provided
blogPostSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  
  next();
});

// Pre-save middleware to calculate read time
blogPostSchema.pre('save', function(next) {
  if (!this.isModified('content')) return next();
  
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  this.readTime = Math.ceil(wordCount / wordsPerMinute);
  
  next();
});

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
