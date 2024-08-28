import mongoose from "mongoose";
const { Schema } = mongoose;

const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: Array,
    default: ["study abroad guide", "Reviews", "Tips", "Events", "FAQS"],
  },
  tags: [{
    type: String,
    trim: true
  }],
},{timestamps: true});

const BlogPost =
  mongoose.models.BlogPost ||
  mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
