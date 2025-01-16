"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PartnerTypeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentType = searchParams.get("type") || "all";

  function onValueChange(value) {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("type");
    } else {
      params.set("type", value);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Tabs value={currentType} onValueChange={onValueChange}>
      <TabsList>
        <TabsTrigger value="all">All Partners</TabsTrigger>
        <TabsTrigger value="university">Universities</TabsTrigger>
        <TabsTrigger value="agency">Agencies</TabsTrigger>
      </TabsList>
    </Tabs>
  );
} 