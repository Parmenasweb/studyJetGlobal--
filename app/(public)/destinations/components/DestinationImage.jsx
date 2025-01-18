"use client";

import Image from "next/image";

export function DestinationImage({ src, alt, className, ...props }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        className="object-cover transition-all duration-300"
        quality={90}
        {...props}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
    </div>
  );
} 