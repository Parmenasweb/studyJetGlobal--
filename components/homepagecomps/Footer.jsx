import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-20 px-4 sm:px-6 lg:px-8 w-full">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-bold mb-4">
              We would love to hear from you.
            </h2>
            <p className="mb-6">
              Feel free to reach out if you want to collaborate with us, or
              simply have a chat
            </p>
            <Link
              href="/become-client"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100"
            >
              Become a Client
              <ArrowUpRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
            <p className="mt-6 text-sm">
              Don&apos;t like the forms? Drop us a line via email.
            </p>
            <p className="text-sm">info@studyjetglobal.com</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact us</h3>
            <p className="mb-2">Our Email</p>
            <p className="mb-4">info@studyjetglobal.com</p>
            <p className="mb-2">Our Phone</p>
            <p className="mb-4">+91 9000000000</p>
            <p className="mb-2">San Francisco, CA 2</p>
            <p>Embarcadero Center, 8 floor, 94111</p>
          </div>

          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="/about" prefetch={false}>
              About Us
            </Link>
            <Link href="#" prefetch={false}>
              Our Team
            </Link>
            <Link href="#" prefetch={false}>
              Careers
            </Link>
            <Link href="/contact" prefetch={false}>
              Contact Us
            </Link>
          </div>

          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="/blog" prefetch={false}>
              Blog
            </Link>
            <Link href="/scholarships" prefetch={false}>
              Scholarships
            </Link>
            <Link href="/onBarding/consultationForm" prefetch={false}>
              Book Consultation
            </Link>
            <Link href="/contact" prefetch={false}>
              Contact
            </Link>
          </div>

          <div className="grid gap-1">
            <h3 className="font-semibold">Connect</h3>
            <Link
              href="https://www.instagram.com/studyjetglobal_official?igsh=MWpuOGh3cG5tZzI2NA=="
              prefetch={false}
            >
              Instagram
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61562265136097"
              prefetch={false}
            >
              Facebook
            </Link>
            <Link
              href="https://x.com/StudyJetGlobal_?t=Gi5aGQkERmKqKKleahTDew&s=08"
              prefetch={false}
            >
              Twitter
            </Link>
          </div>

          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="/privacyPolicy" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="/termsOfService" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="/cookie" prefetch={false}>
              Cookie Policy
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; StudyJetGlobal {new Date().getFullYear()}. All rights
            reserved •{" "}
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <p className="text-xs text-muted-foreground">
              made with love by{" "}
              <span>
                <Link
                  href="https://x.com/Par_me_nas?t=-p7HZiWOMdK627hKN0cWnw&s=08"
                  prefetch={false}
                >
                  (papiichulzzz)...
                </Link>
              </span>
            </p>
          </nav>
          <Link href="#top" className="mt-4 sm:mt-0 text-sm hover:underline">
            Back to the top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}

// import Link from "next/link";

// export default function Footer() {
//   return (
//     <footer className="bg-slate-100  w-full">
//       <div className=" w-full p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
//         <div className="grid gap-1">
//           <h3 className="font-semibold">Company</h3>
//           <Link href="/about" prefetch={false}>
//             About Us
//           </Link>
//           <Link href="#" prefetch={false}>
//             Our Team
//           </Link>
//           <Link href="#" prefetch={false}>
//             Careers
//           </Link>
//           <Link href="/contact" prefetch={false}>
//             Contact Us
//           </Link>
//         </div>
//         <div className="grid gap-1">
//           <h3 className="font-semibold">Destinations</h3>
//           <Link href="/distinations&programs" prefetch={false}>
//             India
//           </Link>
//           <Link href="#" prefetch={false}>
//             U.S.A
//           </Link>
//           <Link href="#" prefetch={false}>
//             U.K
//           </Link>
//           <Link href="#" prefetch={false}>
//             Georgia
//           </Link>
//         </div>
//         <div className="grid gap-1">
//           <h3 className="font-semibold">Resources</h3>
//           <Link href="/blog" prefetch={false}>
//             Blog
//           </Link>
//           <Link href="/schorlarships" prefetch={false}>
//             Scholarships
//           </Link>
//           <Link href="/onBarding/consultationForm" prefetch={false}>
//             Book Consultation
//           </Link>
//           <Link href="/contact" prefetch={false}>
//             Contact
//           </Link>
//         </div>
//         <div className="grid gap-1">
//           <h3 className="font-semibold">Legal</h3>
//           <Link href="/privacyPolicy" prefetch={false}>
//             Privacy Policy
//           </Link>
//           <Link href="/termsOfService" prefetch={false}>
//             Terms of Service
//           </Link>
//           <Link href="/cookie" prefetch={false}>
//             Cookie Policy
//           </Link>
//         </div>
//
//       </div>
//       <div className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
//         <p className="text-xs text-muted-foreground">
//           &copy; 2024 Study Abroad Agency. All rights reserved.
//         </p>
//         <nav className="sm:ml-auto flex gap-4 sm:gap-6">
//           <p className="text-xs text-muted-foreground">
//             made with love by{" "}
//             <span>
//               <Link
//                 href="https://x.com/Par_me_nas?t=-p7HZiWOMdK627hKN0cWnw&s=08"
//                 prefetch={false}
//               >
//                 (papiichulzzz)...
//               </Link>
//             </span>
//           </p>
//         </nav>
//       </div>
//     </footer>

//   );
// }

// function FacebookIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//     </svg>
//   );
// }

// function GlobeIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
//       <path d="M2 12h20" />
//     </svg>
//   );
// }

// function InstagramIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
//       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//       <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
//     </svg>
//   );
// }

// function LinkedinIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//       <rect width="4" height="12" x="2" y="9" />
//       <circle cx="4" cy="4" r="2" />
//     </svg>
//   );
// }

// function TwitterIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
//     </svg>
//   );
// }

// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   );
// }
