"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "../students/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import {
  BarChart,
  PieChart,
  Eye,
  ThumbsUp,
  MessageSquare,
  FileEdit,
  Trash2,
  Plus,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { mockBlogs, blogStats } from "./data/mock-blogs";
import { formatDate } from "@/lib/utils";

// Dynamically import the ContentForm component with SSR disabled
const ContentForm = dynamic(() => import("./components/content-form"), {
  ssr: false,
});

// Create a proper component for the actions cell
function BlogActions({ blog }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push(`/private/dashboard/blogs/${blog._id}/edit`)}
      >
        <FileEdit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this blog?")) {
            // Handle delete
          }
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function BlogPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.getValue("category")}</Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        const variants = {
          published: "success",
          draft: "secondary",
          archived: "destructive",
        };
        return <Badge variant={variants[status]}>{status}</Badge>;
      },
    },
    {
      accessorKey: "views",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Views
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-muted-foreground" />
          {row.getValue("views")}
        </div>
      ),
    },
    {
      accessorKey: "likeCount",
      header: "Likes",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          {row.getValue("likeCount")}
        </div>
      ),
    },
    {
      accessorKey: "commentCount",
      header: "Comments",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          {row.getValue("commentCount")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => formatDate(row.getValue("createdAt")),
    },
    {
      id: "actions",
      cell: ({ row }) => <BlogActions blog={row.original} />,
    },
  ];

  return (
    <div className="h-full ml-[5%] flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blog Management</h2>
          <p className="text-muted-foreground">
            Create and manage your blog content
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new blog post
              </DialogDescription>
            </DialogHeader>
            <ContentForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <FileEdit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogStats.totalBlogs}</div>
            <p className="text-xs text-muted-foreground">
              {blogStats.publishedBlogs} published
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogStats.totalViews}</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogStats.totalLikes}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogStats.totalComments}</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Blog Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              {/* Add chart component here */}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogStats.categoryBreakdown.map((item) => (
                <div key={item.category} className="flex items-center">
                  <div className="w-1/2 font-medium">{item.category}</div>
                  <div className="w-1/2 text-right">{item.count} posts</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Manage your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <TabsContent value="all" className="mt-4">
              <DataTable columns={columns} data={mockBlogs} />
            </TabsContent>
            <TabsContent value="published" className="mt-4">
              <DataTable
                columns={columns}
                data={mockBlogs.filter((blog) => blog.status === "published")}
              />
            </TabsContent>
            <TabsContent value="drafts" className="mt-4">
              <DataTable
                columns={columns}
                data={mockBlogs.filter((blog) => blog.status === "draft")}
              />
            </TabsContent>
            <TabsContent value="archived" className="mt-4">
              <DataTable
                columns={columns}
                data={mockBlogs.filter((blog) => blog.status === "archived")}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}