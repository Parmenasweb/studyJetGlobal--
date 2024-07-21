import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import BlogPostCard from "./components/BlogPostCard";
import { blogPosts } from "@/lib/countrydetails";
import Footer from "@/components/homepagecomps/Footer";

export default function Component() {
  return (
    <div className="flex flex-col min-h-dvh">
      <section className="bg-gradient-to-r from-primary to-primary-foreground py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-4 text-center text-primary-foreground">
            <h1 className="text-4xl font-bold pt-12 tracking-tight sm:text-5xl md:text-6xl">
              Discover the World with Our Study Abroad Blog
            </h1>
            <p className="text-lg md:text-xl">
              Explore inspiring stories, practical tips, and insider insights to
              make the most of your study abroad experience.
            </p>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          <div className="flex items-center justify-between pb-6">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <span>Sort by</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Date</DropdownMenuItem>
                  <DropdownMenuItem>Category</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <span>Filter by</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Study Abroad</DropdownMenuItem>
                  <DropdownMenuItem>Travel Tips</DropdownMenuItem>
                  <DropdownMenuItem>Student Life</DropdownMenuItem>
                  <DropdownMenuItem>Scholarships</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols- lg:grid-cols-3">
            {blogPosts.map((item, ind) => {
              return (
                <BlogPostCard
                  key={ind}
                  title={item.title}
                  content={item.content}
                  imageUrl={item.imageUrl}
                />
              );
            })}
          </div>
        </div>
      </section>
      <aside className="bg-muted py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-[1fr_300px]">
            <div>
              <h2 className="text-2xl font-bold">Popular Tags</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  Study Abroad
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  Travel Tips
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  Student Life
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  Scholarships
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  Language Learning
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  Cultural Exchange
                </Badge>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold">Search the Blog</h2>
                <form className="mt-4 flex gap-2">
                  <Input
                    type="search"
                    placeholder="Search blog posts..."
                    className="flex-1"
                  />
                  <Button type="submit">
                    <SearchIcon className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <Footer />
    </div>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
