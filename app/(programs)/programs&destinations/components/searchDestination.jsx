"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState, useMemo } from "react";

export default function SearchDestinations() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDestinations = useMemo(() => {
    const destinations = [
      "Europe",
      "Asia",
      "Latin America",
      "Oceania",
      "Africa",
    ];
    return destinations.filter((destination) =>
      destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-2">
      <Input
        placeholder="Search destinations"
        className="w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid gap-2">
        {filteredDestinations.map((destination) => (
          <Button key={destination} variant="outline" className="justify-start">
            <FlagIcon className="mr-2 w-4 h-4" />
            {destination}
          </Button>
        ))}
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
