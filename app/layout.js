// "use client";
import { Space_Grotesk } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./(home)/components/Navbar";
import { auth } from "@/auth";
import { AuthProvider } from "@/components/AuthProvider";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Toaster } from "@/components/ui/sonner";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "StudyJet Global",
  description: "Your trusted partner for international education",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={spaceGrotesk.className}>
          <AuthProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative min-h-screen">
                <Navbar />
                <main className="w-full mx-auto">{children}</main>
                <Toaster />
              </div>
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
