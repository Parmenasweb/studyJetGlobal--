"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right University: A Complete Guide",
    excerpt:
      "Learn about the key factors to consider when selecting your dream university abroad.",
    category: "University Guide",
    author: "Dr. Sarah Wilson",
    date: "2024-03-15",
    readTime: "8 min read",
    image: "/images/blog/university-choice.jpg",
    tags: ["University Selection", "Study Abroad", "Decision Making"],
  },
  {
    id: 2,
    title: "Top Scholarships for International Students in 2024",
    excerpt:
      "Discover the best scholarship opportunities available for international students this year.",
    category: "Scholarships",
    author: "Michael Chang",
    date: "2024-03-10",
    readTime: "6 min read",
    image: "/images/blog/scholarships.jpg",
    tags: ["Scholarships", "Funding", "Financial Aid"],
  },
  {
    id: 3,
    title: "Student Life in the UK: What to Expect",
    excerpt:
      "A comprehensive guide to living and studying in the United Kingdom as an international student.",
    category: "Student Life",
    author: "Emma Thompson",
    date: "2024-03-05",
    readTime: "10 min read",
    image: "/images/blog/uk-life.jpg",
    tags: ["UK", "Student Life", "Culture"],
  },
  {
    id: 4,
    title: "IELTS vs TOEFL: Which Test Should You Take?",
    excerpt:
      "Compare the two major English language tests and decide which one is right for you.",
    category: "Test Preparation",
    author: "James Miller",
    date: "2024-03-01",
    readTime: "7 min read",
    image: "/images/blog/language-tests.jpg",
    tags: ["IELTS", "TOEFL", "Language Tests"],
  },
];

const categories = [
  "All",
  "University Guide",
  "Scholarships",
  "Student Life",
  "Test Preparation",
  "Visa Guide",
  "Career Advice",
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Study Abroad Insights
        </h1>
        <p className="text-lg text-muted-foreground">
          Expert advice, tips, and guides for your international education journey
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,200px] gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="aspect-video bg-muted relative">
                {/* Add Image component when images are available */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Tag className="h-4 w-4" />
                      <span>{filteredPosts[0].category}</span>
                    </div>
                    <h2 className="text-2xl font-bold">{filteredPosts[0].title}</h2>
                    <p className="text-muted-foreground">
                      {filteredPosts[0].excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{filteredPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(filteredPosts[0].date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{filteredPosts[0].readTime}</span>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto">Read More</Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.slice(1).map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="aspect-video bg-muted relative">
                {/* Add Image component when images are available */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full group">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-16">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <BookOpen className="h-8 w-8 mx-auto mb-4 text-primary" />
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for the latest study abroad tips and insights
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" type="email" />
            <Button>Subscribe</Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 