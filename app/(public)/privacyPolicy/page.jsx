import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full py-12">
      <h1 className="text-3xl font-bold mb-8">StudyJet Global Privacy Policy</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-muted-foreground">
            At StudyJetGlobal, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Personal Information</h3>
              <p className="text-muted-foreground">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>Register for our services</li>
                <li>Fill out consultation forms</li>
                <li>Submit application forms</li>
                <li>Sign up for our newsletter</li>
                <li>Contact us through our website</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Automatically Collected Information</h3>
              <p className="text-muted-foreground">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Access times</li>
                <li>Pages viewed</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>Process your applications and requests</li>
            <li>Communicate with you about our services</li>
            <li>Send you updates and promotional materials</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
            <li>Prevent fraud and enhance security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
          <p className="text-muted-foreground">
            We may share your information with:
          </p>
          <ul className="list-disc list-inside mt-2 text-muted-foreground">
            <li>Educational institutions when processing your applications</li>
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational security measures to protect your personal information. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-muted-foreground mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Withdraw consent for data processing</li>
            <li>Object to data processing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this Privacy Policy, please contact us at:{" "}
            <Link href="mailto:info@studyjetglobal.com" className="text-primary hover:underline">
              info@studyjetglobal.com
            </Link>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this privacy policy from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date and the updated version will be effective as soon as it is accessible.
          </p>
        </section>
      </div>
    </div>
  );
} 