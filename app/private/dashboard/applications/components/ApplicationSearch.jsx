"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function ApplicationSearch({ onSearch, onFilter }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    dateRange: {
      from: undefined,
      to: undefined,
    },
    priority: "all",
    destination: "all",
    program: "all",
  });
  const [activeFilters, setActiveFilters] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key, value) => {
    // If value is "all", treat it as an empty filter
    const filterValue = value === "all" ? "" : value;
    const newFilters = { ...filters, [key]: filterValue };
    setFilters(newFilters);
    
    // Count active filters (excluding "all" values)
    const activeCount = Object.values(newFilters).filter(
      (val) => val && (typeof val === "string" ? val.length > 0 : true)
    ).length;
    setActiveFilters(activeCount);
    
    onFilter(newFilters);
  };

  return (
    <div className="flex items-center gap-2">
      <form onSubmit={handleSearch} className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </form>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="relative">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {activeFilters > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 rounded-full px-1 font-normal"
              >
                {activeFilters}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Date Range</h4>
              <CalendarDateRangePicker
                value={filters.dateRange}
                onChange={(date) => handleFilterChange("dateRange", date)}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Priority</h4>
              <Select
                value={filters.priority}
                onValueChange={(value) => handleFilterChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Destination</h4>
              <Select
                value={filters.destination}
                onValueChange={(value) => handleFilterChange("destination", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                  <SelectItem value="ireland">Ireland</SelectItem>
                  <SelectItem value="newzealand">New Zealand</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="italy">Italy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
} 