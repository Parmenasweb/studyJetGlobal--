import { Space_Grotesk } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./(home)/components/Navbar";
import { auth } from "@/auth";
import { AuthProvider } from "@/components/AuthProvider";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { metadata, viewport, structuredData } from "./metadata.config";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export { metadata, viewport };

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/images/favicon.ico" sizes="any" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="apple-mobile-web-app-title" content="studyjetGlobal" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData)
            }}
          />
        </head>
        <body className={spaceGrotesk.className}>
          <AuthProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative min-h-screen overflow-x-hidden">
                <Navbar />
                <main className="w-full">{children}</main>
                <Toaster />
              </div>
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
