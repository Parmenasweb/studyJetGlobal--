"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function ScholarshipCard({ name, description, imageUrl }) {
  return (
    <Card className="h-full w-full">
      <Image
        width={300}
        height={120}
        src={imageUrl}
        alt="Scholarship Image"
        className="rounded-t-lg object-cover w-full"
      />
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-muted-foreground">{description}</p>
        <Link
          href="#"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Apply Now
        </Link>
      </CardContent>
    </Card>
  );
}
