"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const regions = [
  "All Regions",
  "North America",
  "Europe",
  "Asia",
  "Oceania",
  "Africa",
  "South America",
];

export function SearchDestinations() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All Regions");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (region !== "All Regions") params.set("region", region);
    router.push(`/destinations${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-3xl flex flex-col sm:flex-row gap-4"
    >
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search destinations..."
          className="pl-10 bg-background/80 backdrop-blur-sm border-muted"
        />
      </div>
      <Select value={region} onValueChange={setRegion}>
        <SelectTrigger className="w-full sm:w-[180px] bg-background/80 backdrop-blur-sm border-muted">
          <SelectValue placeholder="Select region" />
        </SelectTrigger>
        <SelectContent>
          {regions.map((r) => (
            <SelectItem key={r} value={r}>
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" className="bg-primary/90 hover:bg-primary">
        Search
      </Button>
    </form>
  );
} 