// "use client";
import { Space_Grotesk } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./(home)/components/Navbar";
import { auth } from "@/auth";
import { AuthProvider } from "@/components/AuthProvider";
import DialogAct from "@/components/homepagecomps/dialog";

import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
// import { useSession } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "studyjetglobal",
  description: "study abroad agency and consultancy",
};

// export const queryClient = new QueryClient();

export default async function RootLayout({ children }) {
  const session = await auth();
  // const {session} = useSession();
  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={spaceGrotesk.className}>
          <AuthProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <div className=" w-full h-[15%] inset-x-0 fixed bg-primary-foreground top-0 z-50">
                <Navbar />
                <DialogAct />
              </div>
              <div className=" lg:mt-[5%] pt-5">{children}</div>
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
