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

// Combined navigation items
const navItems = [
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
  {
    title: "Partners",
    href: "/private/dashboard/partners",
    icon: Handshake,
  },
  {
    title: "Agents",
    href: "/private/dashboard/agents",
    icon: Users,
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

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="fixed top-[1.2rem] left-4 z-40 lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <div className="flex h-[calc(100vh-4rem)] flex-col">
            <div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
              <Link 
                href="/private/dashboard" 
                className="flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <GraduationCap className="h-5 w-5" />
                <span className="font-semibold">StudyJet Global</span>
              </Link>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-1 p-2">
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
            <div className="border-t p-4 shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-16 left-0 w-64 flex-col border-r bg-background h-[calc(100vh-4rem)]">
        <div className="flex h-14 shrink-0 items-center border-b px-6">
          <Link href="/private/dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="font-bold">StudyJet Global</span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-3">
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
        <div className="border-t p-4 shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
