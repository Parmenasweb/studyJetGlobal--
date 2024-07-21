"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import PageTitle from "@/components/pageTitle";

export default function BlogPostCard({ title, content, imageUrl }) {
  return (
    <Card>
      <Image
        src={imageUrl}
        alt="Blog Post Image"
        width={400}
        height={225}
        className="aspect-[4/3] w-full rounded-t-lg object-cover"
      />
      <CardContent className="space-y-2 p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-muted-foreground line-clamp-3">{content}</p>
        <Link
          href="#"
          className="inline-flex items-center gap-2 text-primary hover:underline"
          prefetch={false}
        >
          Read More
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
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
