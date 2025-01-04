import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SideNavbar from "./components/SideNavbar";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
