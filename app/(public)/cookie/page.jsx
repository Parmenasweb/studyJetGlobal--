import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <div className="container  py-12">
      <h1 className="text-3xl font-bold mb-8">StudyJet Global Cookie Policy</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
          <p className="text-muted-foreground">
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide useful information to website owners.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
          <p className="text-muted-foreground mb-4">
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>To enable certain functions of the website</li>
            <li>To provide analytics</li>
            <li>To store your preferences</li>
            <li>To enable authentication and security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Essential Cookies</h3>
              <p className="text-muted-foreground">
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Performance Cookies</h3>
              <p className="text-muted-foreground">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Functionality Cookies</h3>
              <p className="text-muted-foreground">
                These cookies enable the website to remember choices you make (such as your language preference) and provide enhanced features.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Targeting Cookies</h3>
              <p className="text-muted-foreground">
                These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
          <p className="text-muted-foreground mb-4">
            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
          </p>
          <p className="text-muted-foreground">
            To learn more about cookies and how to manage them, visit:{" "}
            <Link 
              href="https://www.aboutcookies.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              aboutcookies.org
            </Link>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
          <p className="text-muted-foreground">
            In some special cases, we also use cookies provided by trusted third parties:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
            <li>Google Analytics cookies help us understand how you use our website</li>
            <li>Social media cookies enable you to share our content on platforms like Facebook and Twitter</li>
            <li>Payment processor cookies help ensure your transactions are secure</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Cookie Policy from time to time. We encourage you to periodically review this page for the latest information about our cookie practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about our Cookie Policy, please contact us at:{" "}
            <Link href="mailto:info@studyjetglobal.com" className="text-primary hover:underline">
              info@studyjetglobal.com
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
} 