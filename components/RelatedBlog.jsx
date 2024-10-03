import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";

// interface BlogPost {
//   id: string
//   title: string
//   image: string
//   excerpt: string
//   date: string
//   likes: number
// }

const blogPosts = [
  {
    id: "1",
    title: "Top 10 Best MBA Universities in Australia for Program",
    image: "/placeholder.svg?height=200&width=300",
    excerpt:
      "Discover the top MBA programs in Australia, including world-renowned institutions and their unique offerings for international students.",
    date: "Jan 12, 2024",
    likes: 52,
  },
  {
    id: "2",
    title: "Different Types of Universities in Australia",
    image: "/placeholder.svg?height=200&width=300",
    excerpt:
      "Learn about the various types of universities in Australia, from research-intensive institutions to technology-focused universities.",
    date: "Jan 08, 2024",
    likes: 52,
  },
  {
    id: "3",
    title: "IELTS Band requirements for studying in Australia",
    image: "/placeholder.svg?height=200&width=300",
    excerpt:
      "Understand the IELTS band score requirements for different Australian universities and courses to prepare for your study abroad journey.",
    date: "Oct 06, 2023",
    likes: 52,
  },
];

export default function RelatedBlog() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Related Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col h-full">
            <CardHeader className="p-0">
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle className="text-lg mb-2 line-clamp-2">
                {post.title}
              </CardTitle>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <p className="text-sm text-gray-500">{post.date}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
              <Button variant="ghost" size="sm">
                <HeartIcon className="w-4 h-4 mr-1" />
                {post.likes}
              </Button>
              <Button variant="outline" size="sm">
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
