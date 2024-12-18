"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createBlog, updateBlog } from "@/actions/blog";
import dynamic from "next/dynamic";

const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  excerpt: z.string().min(1, "Excerpt is required").max(300),
  content: z.string().min(1, "Content is required"),
  category: z.enum([
    "Study Abroad Guide",
    "Student Reviews",
    "Travel Tips",
    "Events & Updates",
    "FAQs",
    "Scholarships",
    "Visa Guide",
    "University Spotlights"
  ]),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  coverImage: z.object({
    url: z.string().url("Invalid image URL"),
    alt: z.string(),
    caption: z.string().optional()
  }).optional(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    ogImage: z.string().url("Invalid OG image URL").optional()
  }).optional(),
  featured: z.boolean().default(false)
});

// Dynamically import the Editor component
const Editor = dynamic(() => import("./editor/editor"), {
  ssr: false,
  loading: () => (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border border-stone-200 bg-white rounded-lg animate-pulse" />
  ),
});

export default function ContentForm({ initialData, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [tags, setTags] = useState(initialData?.tags || []);
  const [newTag, setNewTag] = useState("");
  const [editorContent, setEditorContent] = useState(initialData?.content || "");

  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: initialData || {
      title: "",
      excerpt: "",
      content: "",
      category: "Study Abroad Guide",
      tags: [],
      status: "draft",
      featured: false,
      coverImage: {
        url: "",
        alt: "",
        caption: ""
      },
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: [],
        ogImage: ""
      }
    }
  });

  // Update form when editor content changes
  useEffect(() => {
    form.setValue("content", editorContent);
  }, [editorContent, form]);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      form.setValue("tags", [...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    form.setValue("tags", updatedTags);
  };

  async function onSubmit(data) {
    try {
      setIsSubmitting(true);
      const action = initialData ? updateBlog : createBlog;
      const result = await action(initialData?._id, {
        ...data,
        slug: data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(
        initialData
          ? "Blog post updated successfully"
          : "Blog post created successfully"
      );
      onSuccess?.();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a brief excerpt"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A short summary that appears in blog previews
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Study Abroad Guide">Study Abroad Guide</SelectItem>
                      <SelectItem value="Student Reviews">Student Reviews</SelectItem>
                      <SelectItem value="Travel Tips">Travel Tips</SelectItem>
                      <SelectItem value="Events & Updates">Events & Updates</SelectItem>
                      <SelectItem value="FAQs">FAQs</SelectItem>
                      <SelectItem value="Scholarships">Scholarships</SelectItem>
                      <SelectItem value="Visa Guide">Visa Guide</SelectItem>
                      <SelectItem value="University Spotlights">University Spotlights</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Tags</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Editor
                      initialValue={field.value}
                      onChange={(value) => {
                        setEditorContent(value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <FormField
              control={form.control}
              name="coverImage.url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage.alt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Alt Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter alt text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage.caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Caption</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter caption" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <FormField
              control={form.control}
              name="seo.metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter meta title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seo.metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter meta description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seo.ogImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter OG image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onSuccess?.()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : initialData
                ? "Update Post"
                : "Create Post"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}