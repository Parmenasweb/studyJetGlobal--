// "use client";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import SideNavbar from "./components/SideNavbar";

// import { useSession } from "next-auth/react";
// import { Toaster } from "@/components/ui/toaster";
export default async function DashBoardLayout({ children }) {
  const session = await auth();
  // const {session} = useSession();
  return (
    <body className={cn(" ")}>
      {/* sidebar */}
      <div className="min-h-screen w-full bg-white text-black mt-[15%] flex justify-between ">
        <div className=" fixed w-[15%]">
          <SideNavbar />
        </div>

        {/* main page */}
        <div className="p-8 w-[85%] ml-auto">{children}</div>
      </div>
    </body>
  );
}
