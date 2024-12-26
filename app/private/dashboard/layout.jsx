"use client";

import SideNavbar from "./components/SideNavbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 h-full flex-col md:flex">
        <SideNavbar />
      </div>
      <main className="md:pl-72 h-full">
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
