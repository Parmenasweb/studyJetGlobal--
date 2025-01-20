"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const navLinks = {
  study: {
    label: "Study",
    items: [
      { label: "Destinations", href: "/destinations" },
      { label: "Programs", href: "/programs" },
      { label: "Scholarship", href: "/scholarships" },
    ],
  },
  resources: {
    label: "Resources",
    items: [
      { label: "Visa Guide", href: "/visa-guide" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Blog", href: "/blog" },
    ],
  },
  services: {
    label: "Services",
    items: [
      { label: "Services", href: "/services" },
      { label: "Application Guide", href: "/application-guide" },
    ],
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    setIsOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="w-[100%] mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logotrans.jpeg"
            alt="StudyJet Global Logo"
            width={150} 
            height={90}
            quality={100}
            priority
            className="object-contain rounded-sm"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {Object.entries(navLinks).map(([key, section]) => (
                <NavigationMenuItem key={key}>
                  <NavigationMenuTrigger>{section.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-4">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                pathname === item.href
                                  ? "bg-accent text-accent-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              {item.label}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/about"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            About
          </Link>
          <Link
            href="/contactUs"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/contact"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 mt-8">
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(navLinks).map(([key, section]) => (
                    <AccordionItem key={key} value={key}>
                      <AccordionTrigger className="text-sm font-medium">
                        {section.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-2 pl-4">
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={handleLinkClick}
                              className={cn(
                                "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                                pathname === item.href
                                  ? "bg-accent text-accent-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="flex flex-col gap-2">
                  <Link
                    href="/about"
                    onClick={handleLinkClick}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                      pathname === "/about"
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    About
                  </Link>
                  <Link
                    href="/contactUs"
                    onClick={handleLinkClick}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                      pathname === "/contactUs"
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Contact
                  </Link>
                </div>

                <div className="flex flex-col gap-2 pt-4 border-t">
                  {session ? (
                    <>
                      <Button asChild variant="default" className="w-full justify-start">
                        <Link href="/private/dashboard" onClick={handleLinkClick}>
                          Dashboard
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="ghost" className="w-full justify-start">
                        <Link href="/auth/login" onClick={handleLinkClick}>Sign In</Link>
                      </Button>
                      <Button asChild className="w-full justify-start">
                        <Link href="/onBoarding/consultationForm" onClick={handleLinkClick}>Book Free Consultation</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {session ? (
              <>
                <Button asChild variant="default">
                  <Link href="/private/dashboard">Dashboard</Link>
                </Button>
                <Button 
                  variant="ghost"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/onBoarding/consultationForm">Book Free Consultation</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

// --------------------------------------------
