import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SideNavbar from "./components/SideNavbar";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="relative">
      <SideNavbar />

      <main className="fixed top-8 lg:left-48 left-0 right-0 bottom-0 overflow-y-auto bg-background p-4 lg:p-6">
        {children}
      </main>
    </div>
  );
}
