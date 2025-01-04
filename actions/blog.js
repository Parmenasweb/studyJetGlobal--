"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import BlogPost from "@/models/Blogs";
import { auth } from "@/auth";

export async function getBlogs(query = {}) {
  try {
    await connectDB();
    const blogs = await BlogPost.find(query)
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    return { data: blogs };
  } catch (error) {
    return { error: "Failed to fetch blogs" };
  }
}

export async function getBlog(id) {
  try {
    await connectDB();
    const blog = await BlogPost.findById(id)
      .populate('author', 'name email')
      .populate('comments.author', 'name email')
      .populate('relatedPosts', 'title slug coverImage');
    
    if (!blog) {
      return { error: "Blog not found" };
    }
    return { data: blog };
  } catch (error) {
    return { error: "Failed to fetch blog" };
  }
}

export async function createBlog(data) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectDB();
    const blog = await BlogPost.create({
      ...data,
      author: session.user.id
    });

    revalidatePath("/private/dashboard/blogs");
    return { data: blog };
  } catch (error) {
    return { error: "Failed to create blog" };
  }
}

export async function updateBlog(id, data) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectDB();
    const blog = await BlogPost.findByIdAndUpdate(
      id,
      { ...data },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return { error: "Blog not found" };
    }

    revalidatePath("/private/dashboard/blogs");
    revalidatePath(`/blogs/${blog.slug}`);
    return { data: blog };
  } catch (error) {
    return { error: "Failed to update blog" };
  }
}

export async function deleteBlog(id) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectDB();
    const blog = await BlogPost.findByIdAndDelete(id);

    if (!blog) {
      return { error: "Blog not found" };
    }

    revalidatePath("/private/dashboard/blogs");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete blog" };
  }
}

export async function addComment(blogId, comment) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectDB();
    const blog = await BlogPost.findByIdAndUpdate(
      blogId,
      { 
        $push: { 
          comments: {
            ...comment,
            author: session.user.id
          }
        }
      },
      { new: true }
    ).populate('comments.author', 'name email');

    if (!blog) {
      return { error: "Blog not found" };
    }

    revalidatePath(`/blogs/${blog.slug}`);
    return { data: blog };
  } catch (error) {
    return { error: "Failed to add comment" };
  }
}

export async function toggleLike(blogId) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectDB();
    const blog = await BlogPost.findById(blogId);

    if (!blog) {
      return { error: "Blog not found" };
    }

    const userLiked = blog.likes.includes(session.user.id);
    const update = userLiked
      ? { $pull: { likes: session.user.id } }
      : { $addToSet: { likes: session.user.id } };

    const updatedBlog = await BlogPost.findByIdAndUpdate(
      blogId,
      update,
      { new: true }
    );

    revalidatePath(`/blogs/${blog.slug}`);
    return { data: updatedBlog };
  } catch (error) {
    return { error: "Failed to toggle like" };
  }
}

export async function incrementViews(blogId) {
  try {
    await connectDB();
    const blog = await BlogPost.findByIdAndUpdate(
      blogId,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return { error: "Blog not found" };
    }

    return { data: blog };
  } catch (error) {
    return { error: "Failed to increment views" };
  }
}

export async function getBlogStats() {
  try {
    await connectDB();
    
    const stats = await BlogPost.aggregate([
      {
        $facet: {
          totalBlogs: [{ $count: "count" }],
          publishedBlogs: [
            { $match: { status: "published" } },
            { $count: "count" }
          ],
          totalViews: [
            { $group: { _id: null, total: { $sum: "$views" } } }
          ],
          totalLikes: [
            { $project: { likeCount: { $size: "$likes" } } },
            { $group: { _id: null, total: { $sum: "$likeCount" } } }
          ],
          categoryBreakdown: [
            { $group: { _id: "$category", count: { $sum: 1 } } }
          ],
          recentPopular: [
            { $sort: { views: -1, createdAt: -1 } },
            { $limit: 5 },
            { $project: { title: 1, slug: 1, views: 1 } }
          ]
        }
      }
    ]);

    return { data: stats[0] };
  } catch (error) {
    return { error: "Failed to fetch blog statistics" };
  }
} 