export const metadata = {
  metadataBase: new URL("https://studyjetglobal.com"),
  title: {
    default: "StudyJetGlobal - Your Trusted Study Abroad Partner",
    template: "%s | StudyJetGlobal"
  },
  description: "Expert guidance for international education. Get personalized support for university applications, scholarships, and visa processing. Start your study abroad journey today!",
  keywords: [
    "study abroad",
    "international education",
    "university admission",
    "scholarships",
    "student visa",
    "education consultancy",
    "overseas education",
    "global education",
    "study in USA",
    "study in UK",
    "study in Canada",
    "study in Australia"
  ],
  authors: [{ name: "StudyJetGlobal" }],
  creator: "StudyJetGlobal",
  publisher: "StudyJetGlobal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "StudyJetGlobal - Your Trusted Study Abroad Partner",
    description: "Expert guidance for international education. Get personalized support for university applications, scholarships, and visa processing.",
    url: "https://studyjetglobal.com",
    siteName: "StudyJetGlobal",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StudyJetGlobal - International Education Consultancy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyJetGlobal - Your Trusted Study Abroad Partner",
    description: "Expert guidance for international education. Get personalized support for university applications, scholarships, and visa processing.",
    images: ["/images/og-image.jpg"],
    creator: "@StudyJetGlobal_"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Add your Google verification code
    yandex: "yandex-verification-code", // Add if needed
    yahoo: "yahoo-verification-code", // Add if needed
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "StudyJetGlobal",
  "description": "International education consultancy providing expert guidance for studying abroad",
  "url": "https://studyjetglobal.com",
  "logo": "https://studyjetglobal.com/images/logo.png",
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61572227369508",
    "https://www.instagram.com/studyjetglobal_official",
    "https://x.com/StudyJetGlobal_"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "India"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+916000512274",
    "contactType": "customer service",
    "email": "services.studyjetglobal@gmail.com",
    "availableLanguage": ["English", "Hindi"]
  },
  "offers": {
    "@type": "Offer",
    "description": "Study abroad consultation services"
  }
}; 