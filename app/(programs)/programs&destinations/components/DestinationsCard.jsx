"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DestinationsCard({ name, capital, imageUrl }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/programs&destinations/${name}`);
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md"
    >
      <Image
        src={imageUrl}
        width={300}
        height={200}
        alt="study abroad Destination Image"
        className="mb-4 rounded-lg object-cover"
      />
      <h3 className="text-lg font-semibold">
        {capital}, {name}
      </h3>
    </div>
  );
}
