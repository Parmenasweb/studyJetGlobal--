"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProgramsCard({name, programName, description, imageUrl }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/programs/${programName}`)}
      className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-pointer"
    >
      <Image
        src={imageUrl}
        width={300}
        height={200}
        alt="Program Image"
        className="mb-4 rounded-lg object-cover"
      />
      <h3 className="text-lg font-semibold">{name} </h3>
      <p className="text-muted-foreground">{description}</p>
      <Link
        className="text-primary mt-4 block text-right"
        href={`/programs/${programName}`}
      >
        Learn More
      </Link>
    </div>
  );
}
