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
    // <body className={cn(" ")}>
      (<div className="min-h-screen w-full pt-12 bg-white overflow-hidden text-black flex justify-between ">
        <div className=" fixed w-[18%] z-50 ">
          <SideNavbar />
        </div>
        <div className=" w-[80%] relative left-[9%]  overflow-x-hidden mx-auto z-10">{children}</div>
      </div>)
  );
}
