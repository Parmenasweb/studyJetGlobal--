import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

const footerLinks = {
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  study: {
    title: "Study",
    links: [
      { label: "Destinations", href: "/destinations" },
      { label: "Programs", href: "/programs" },
      { label: "Scholarship", href: "/scholarship" },
      { label: "Application Guide", href: "/application-guide" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Visa Guide", href: "/visa-guide" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-5 md:py-16">
          {/* Brand and Newsletter */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="font-bold text-2xl">
              StudyJet Global
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your trusted partner in international education. Join our newsletter for the latest updates and opportunities.
            </p>
            <div className="flex gap-2 max-w-sm">
              <Input type="email" placeholder="Enter your email" className="max-w-[260px]" />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key} className="space-y-3">
                <h4 className="text-sm font-semibold">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t py-6 md:py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} StudyJet Global. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 