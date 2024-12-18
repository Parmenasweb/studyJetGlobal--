"use client";

import Navbar from "@/app/(home)/components/Navbar";
import Footer from "@/components/homepagecomps/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <main className="">
        {children}
        </main>
        <Footer />
    </div>
  );
} 