"use client";
import Image from "next/image";

export default function ProgramsCard({ name, description, imageUrl }) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md">
      <Image
        src={imageUrl}
        width={300}
        height={200}
        alt="Program Image"
        className="mb-4 rounded-lg object-cover"
      />
      <h3 className="text-lg font-semibold">{name} </h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
