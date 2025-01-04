"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Globe,
  FileText,
  DollarSign,
  Calendar,
  Settings,
  PenSquare,
  Menu,
  MessageSquare,
  Handshake,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// Define navigation items with their respective icons
const baseNavItems = [
  {
    title: "Overview",
    href: "/private/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    href: "/private/dashboard/students",
    icon: Users,
  },
  {
    title: "Consultations",
    href: "/private/dashboard/consultations",
    icon: MessageSquare,
  },
  {
    title: "Applications",
    href: "/private/dashboard/applications",
    icon: FileText,
  },
  {
    title: "Destinations",
    href: "/private/dashboard/destinations",
    icon: Globe,
  },
  {
    title: "Programs",
    href: "/private/dashboard/programs",
    icon: GraduationCap,
  },
  {
    title: "Blogs",
    href: "/private/dashboard/blogs",
    icon: PenSquare,
  },
  {
    title: "Deadlines",
    href: "/private/dashboard/deadlines",
    icon: Calendar,
  },
];

const adminNavItems = [
  {
    title: "Partners",
    href: "/private/dashboard/partners",
    icon: Handshake,
  },
  {
    title: "Finances",
    href: "/private/dashboard/finances",
    icon: DollarSign,
  },
  {
    title: "Settings",
    href: "/private/dashboard/settings",
    icon: Settings,
  },
];

export default function SideNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  // Determine which nav items to show based on user role
  const navItems =
    session?.user?.role === "admin"
      ? [...baseNavItems, ...adminNavItems]
      : baseNavItems;

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-6">
              <Link href="/private/dashboard" className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                <span className="font-bold">StudyJet Global</span>
              </Link>
            </div>
            <ScrollArea className="flex-1 px-3 py-4">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <ThemeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex h-screen w-64 flex-col border-r bg-background">
        <div className="flex h-14 items-center border-b px-6">
          <Link href="/private/dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="font-bold">StudyJet Global</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
