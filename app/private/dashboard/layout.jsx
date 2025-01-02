import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SideNavbar } from "./components/nav";
import {
  Users,
  GraduationCap,
  Clock,
  DollarSign,
  Settings,
  FileText,
  BookOpen,
} from "lucide-react";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }

  const isAdmin = session.user.role === "admin";

  // Base navigation links available to all users
  const baseLinks = [
    {
      title: "Overview",
      href: "/private/dashboard",
      icon: BookOpen,
    },
    {
      title: "Students",
      href: "/private/dashboard/students",
      icon: Users,
    },
    {
      title: "Applications",
      href: "/private/dashboard/applications",
      icon: GraduationCap,
    },
    {
      title: "Deadlines",
      href: "/private/dashboard/deadlines",
      icon: Clock,
    },
    {
      title: "Blogs",
      href: "/private/dashboard/blogs",
      icon: FileText,
    },
  ];

  // Admin-only links
  const adminLinks = [
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

  // Combine links based on user role
  const links = isAdmin ? [...baseLinks, ...adminLinks] : baseLinks;

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar links={links} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
