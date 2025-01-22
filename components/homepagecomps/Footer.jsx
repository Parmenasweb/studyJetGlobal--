"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  ChevronUp,
  GraduationCap,
} from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact Us", href: "/contactUs" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Book Consultation", href: "/onBarding/consultationForm" },
    { name: "Contact", href: "/contactUs" },
  ],
  connect: [
    { name: "Instagram", href: "https://www.instagram.com/studyjetglobal_official?igsh=MWpuOGh3cG5tZzI2NA==" },
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61572227369508" },
    { name: "Twitter", href: "https://x.com/StudyJetGlobal_?t=Gi5aGQkERmKqKKleahTDew&s=08" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacyPolicy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookie" },
  ],
};

const contactInfo = [
  { icon: Mail, value: "info.studyjetglobal@gmail.com", label: "Email" },
  { icon: Phone, value: "+91 6003145149", label: "Phone" },
  { icon: MapPin, value: "New Delhi, (guwahati) India", label: "Address" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-[0.05]" />

      <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold text-white">StudyJetGlobal</h2>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              We would love to hear from you
            </h3>
            <p className="text-lg text-gray-400 mb-6">
              Feel free to reach out if you want to collaborate with us, or simply have a chat
            </p>
            <Link
              href="/onBoarding/applicationForm"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-black hover:bg-primary/90 transition-colors"
            >
              Become a Client
              <ArrowUpRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {contactInfo.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-3"
              >
                <div className="mt-1 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
                  <p className="font-medium text-white">{item.label}</p>
                  <p className="text-gray-400">{item.value}</p>
          </div>
          </div>
            ))}
          </motion.div>

          {/* Links Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors"
                      prefetch={false}
                    >
                      {link.name}
            </Link>
                  </li>
                ))}
              </ul>
          </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
            <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors"
              prefetch={false}
            >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Connect</h3>
              <ul className="space-y-3">
                {footerLinks.connect.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors"
                      prefetch={false}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
            </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
            <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors"
              prefetch={false}
            >
                      {link.name}
            </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; StudyJetGlobal {new Date().getFullYear()}. All rights reserved
          </p>
          <p className="text-sm text-gray-400">
            made by Par_me_nas{" "}
            <Link
              href="https://x.com/Par_me_nas?t=-p7HZiWOMdK627hKN0cWnw&s=08"
              className="hover:text-primary transition-colors"
              prefetch={false}
              target="_blank"
              rel="noopener noreferrer"
            >
              (devPappy)...
            </Link>
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
          >
            Back to top
            <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
