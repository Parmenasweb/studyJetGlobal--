"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function FeaturedCards({
  programName,
  destination,
  description,
  capital,
  imageUrl,
}) {
  return (
    <Card>
      <Image
        src={imageUrl}
        width="550"
        height="310"
        alt="Program Image"
        className="mx-auto aspect-video overflow-hidden rounded-t-xl object-cover"
      />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">
          {programName} in {capital}
        </h3>
        <p className="text-muted-foreground text-sm">{destination}</p>
        <p className="text-sm mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}
