
import Link from "next/link";
import Footer from "@/components/homepagecomps/Footer";
import ContactForm from "./components/contactForm";

export default function Page() {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-r from-primary to-primary-foreground py-20 md:py-32 p-12">
        <div className="max-w-3xl mx-auto space-y-4 text-center text-primary-foreground">
          <h1 className="text-4xl font-bold pt-12 tracking-tight sm:text-5xl md:text-6xl">
            Discover the World with Us
          </h1>
          <p className="text-lg md:text-xl">
            Our agency specializes in curating unforgettable study abroad
            experiences for students of all backgrounds. Let us guide you on
            your journey to explore new cultures and expand your horizons.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className=" px-2 md:px-2 grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12">
          <ContactForm />
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Contact Information</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">new delhi india</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    (+91) 6003145149
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    info@studyjetglobal.com
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Follow Us</h3>
              <div className="flex items-center gap-4">
                <Link
                target="_blank"
                rel="noopener noreferrer"
                  href="https://www.facebook.com/profile.php?id=61562265136097"
                  className="text-muted-foreground hover:text-primary"
                  prefetch={false}
                >
                  <FacebookIcon className="h-6 w-6" />
                </Link>
                <Link
                target="_blank"
                rel="noopener noreferrer"
                  href="https://x.com/StudyJetGlobal_?t=Gi5aGQkERmKqKKleahTDew&s=08"
                  className="text-muted-foreground hover:text-primary"
                  prefetch={false}
                >
                  <TwitterIcon className="h-6 w-6" />
                </Link>
                <Link
                target="_blank"
                rel="noopener noreferrer"
                  href="https://www.instagram.com/studyjetglobal_official?igsh=MWpuOGh3cG5tZzI2NA=="
                  className="text-muted-foreground hover:text-primary"
                  prefetch={false}
                >
                  <InstagramIcon className="h-6 w-6" />
                </Link>
                <Link
                target="_blank"
                rel="noopener noreferrer"
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                  prefetch={false}
                >
                  <LinkedinIcon className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
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

function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon(props) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
