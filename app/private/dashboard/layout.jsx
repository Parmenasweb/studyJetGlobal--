"use client";

import SideNavbar from "./components/SideNavbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="relative flex min-h-screen">
      <SideNavbar />
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  );
}
