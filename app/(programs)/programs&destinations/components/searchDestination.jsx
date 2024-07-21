"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchDestinations() {
  return (
    <div className="space-y-2">
      <Input placeholder="Search destinations" className="w-full" />
      <div className="grid gap-2">
        <Button variant="outline" className="justify-start">
          <FlagIcon className="mr-2 w-4 h-4" />
          Europe
        </Button>
        <Button variant="outline" className="justify-start">
          <FlagIcon className="mr-2 w-4 h-4" />
          Asia
        </Button>
        <Button variant="outline" className="justify-start">
          <FlagIcon className="mr-2 w-4 h-4" />
          Latin America
        </Button>
        <Button variant="outline" className="justify-start">
          <FlagIcon className="mr-2 w-4 h-4" />
          Oceania
        </Button>
        <Button variant="outline" className="justify-start">
          <FlagIcon className="mr-2 w-4 h-4" />
          Africa
        </Button>
      </div>
    </div>
  );
}

function FlagIcon(props) {
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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}
