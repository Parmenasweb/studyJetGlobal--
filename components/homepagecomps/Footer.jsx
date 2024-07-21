import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted p-6 md:py-12 w-full">
      <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
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
          <h3 className="font-semibold">Destinations</h3>
          <Link href="/distinations&programs" prefetch={false}>
            India
          </Link>
          <Link href="#" prefetch={false}>
            U.S.A
          </Link>
          <Link href="#" prefetch={false}>
            U.K
          </Link>
          <Link href="#" prefetch={false}>
            Georgia
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Resources</h3>
          <Link href="/blog" prefetch={false}>
            Blog
          </Link>
          <Link href="/schorlarships" prefetch={false}>
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
        <div className="grid gap-1">
          <h3 className="font-semibold">Connect</h3>
          <Link
            href="https://www.instagram.com/studyjetglobal_official?igsh=MWpuOGh3cG5tZzI2NA=="
            prefetch={false}
          >
            Instagram
          </Link>
          <Link href="#" prefetch={false}>
            Facebook
          </Link>
          <Link
            href="https://x.com/StudyJetGlobal_?t=Gi5aGQkERmKqKKleahTDew&s=08"
            prefetch={false}
          >
            Twitter
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Study Abroad Agency. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <p>
            made with love by{" "}
            <span>
              <Link href="https://x.com/Par_me_nas?t=-p7HZiWOMdK627hKN0cWnw&s=08" prefetch={false}>
                (papiichulzzz)...
              </Link>
            </span>
          </p>
        </nav>
      </div>
    </footer>
    // <footer className="bg-muted py-12">
    //   <div className="container max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    //     <div className="flex flex-col items-start gap-4">
    //       <Link href="#" className="flex items-center gap-2" prefetch={false}>
    //         <GlobeIcon className="w-8 h-8 text-primary" />
    //         <span className="text-xl font-bold">StudyjetGloal</span>
    //       </Link>
    //       <p className="text-muted-foreground">
    //         Discover the world with our premier study abroad programs. Unlock
    //         your global potential.
    //       </p>
    //     </div>
    //     <div className="grid gap-2">
    //       <h3 className="text-lg font-semibold">Quick Links</h3>
    //       <Link
    //         href="#"
    //         className="text-muted-foreground hover:underline"
    //         prefetch={false}
    //       >
    //         About Us
    //       </Link>
    //       <Link
    //         href="#"
    //         className="text-muted-foreground hover:underline"
    //         prefetch={false}
    //       >
    //         Programs
    //       </Link>
    //       <Link
    //         href="#"
    //         className="text-muted-foreground hover:underline"
    //         prefetch={false}
    //       >
    //         Contact
    //       </Link>
    //       <Link
    //         href="#"
    //         className="text-muted-foreground hover:underline"
    //         prefetch={false}
    //       >
    //         FAQs
    //       </Link>
    //     </div>
    //     <div className="grid gap-2">
    //       <h3 className="text-lg font-semibold">Destinations</h3>
    //       <Link
    //         href="#"
    //         className="text-muted-foreground hover:underline"
    //         prefetch={false}
    //       >
    //         Europe
    //       </Link>
    //       <Link
    //         href="#"
    //         className="text-muted-foreground hover:underline"
    //         prefetch={false}
    //       >
    //         Asia
    //       </Link>
    //       <Link
    //         href="#"
    //         className="text-muted-foreground hover:underline"
    //         prefetch={false}
    //       >
    //         Latin America
    //       </Link>
    //       <Link
    //         href="#"
    //         className="text-muted-foreground hover:underline"
    //         prefetch={false}
    //       >
    //         Australia
    //       </Link>
    //     </div>
    //     <div className="grid gap-2">
    //       <h3 className="text-lg font-semibold">Follow Us</h3>
    //       <div className="flex gap-4">
    //         <Link
    //           href="#"
    //           className="text-muted-foreground hover:text-primary"
    //           prefetch={false}
    //         >
    //           <FacebookIcon className="w-6 h-6" />
    //         </Link>
    //         <Link
    //           href="#"
    //           className="text-muted-foreground hover:text-primary"
    //           prefetch={false}
    //         >
    //           <TwitterIcon className="w-6 h-6" />
    //         </Link>
    //         <Link
    //           href="#"
    //           className="text-muted-foreground hover:text-primary"
    //           prefetch={false}
    //         >
    //           <InstagramIcon className="w-6 h-6" />
    //         </Link>
    //         <Link
    //           href="#"
    //           className="text-muted-foreground hover:text-primary"
    //           prefetch={false}
    //         >
    //           <LinkedinIcon className="w-6 h-6" />
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
  );
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function GlobeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
