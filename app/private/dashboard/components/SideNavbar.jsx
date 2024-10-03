"use client";

import { useState } from "react";
import { Nav } from "./nav";

import {
  DollarSign,
  LayoutDashboard,
  UsersRound,
  Settings,
  Globe,
  NotebookPen,
  CalendarClock,
  FileText,
  Headset,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 900;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-4  pb-10 sm:pt-24 md:pt-0 lg:pt-1">
      {/* {!mobileWidth && (
        <div className="absolute right-[-20px] -top-5">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )} */}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/private/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Students",
            href: "/private/dashboard/students",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Applications",
            href: "/private/dashboard/applications",
            icon: NotebookPen,
            variant: "ghost",
          },
          {
            title: "Consultations",
            href: "/private/dashboard/consultations",
            icon: Headset,
            variant: "ghost",
          },
          {
            title: "Destinations",
            href: "/private/dashboard/destinations",
            icon: Globe,
            variant: "ghost",
          },
          {
            title: "Finances",
            href: "/private/dashboard/finances",
            icon: DollarSign,
            variant: "ghost",
          },
          {
            title: "Blogs",
            href: "/private/dashboard/blogs",
            icon: FileText,
            variant: "ghost",
          },
          {
            title: "Deadlines",
            href: "/private/dashboard/deadlines",
            icon: CalendarClock,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/private/dashboard/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
