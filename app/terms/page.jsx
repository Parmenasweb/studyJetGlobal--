import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>

      <div className="prose prose-slate max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using Study Jet Global&apos;s services, including
            submitting applications through our platform, you agree to be bound
            by these Terms and Conditions. If you do not agree to these terms,
            please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Service Description
          </h2>
          <p>
            Study Jet Global provides educational and work visa consultation
            services, including but not limited to:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Application processing for educational institutions</li>
            <li>Work visa application assistance</li>
            <li>Document verification and submission</li>
            <li>Guidance on destination country requirements</li>
            <li>Support throughout the application process</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Obligations</h2>
          <p>By using our services, you agree to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              Provide accurate and truthful information in all applications and
              communications
            </li>
            <li>Submit genuine and valid documents</li>
            <li>
              Respond to requests for additional information in a timely manner
            </li>
            <li>Pay any applicable fees as agreed upon</li>
            <li>
              Comply with all laws and regulations of both origin and
              destination countries
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. Privacy and Data Protection
          </h2>
          <p>
            We are committed to protecting your privacy and handling your
            personal information in accordance with applicable data protection
            laws. Please refer to our Privacy Policy for detailed information on
            how we collect, use, and protect your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            5. Application Process
          </h2>
          <p>
            While we strive to provide the best possible service, please note:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              Application outcomes are not guaranteed and depend on various
              factors
            </li>
            <li>
              Processing times may vary based on destination country and type of
              application
            </li>
            <li>Additional documents may be required during the process</li>
            <li>
              Changes in government policies may affect application requirements
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Fees and Payments</h2>
          <p>
            Our fee structure will be clearly communicated before beginning the
            application process. Please note:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>All fees must be paid according to the agreed schedule</li>
            <li>
              Certain fees may be non-refundable as specified in our agreement
            </li>
            <li>Additional costs may arise during the application process</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            7. Limitation of Liability
          </h2>
          <p>Study Jet Global shall not be liable for:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              Rejection of applications by educational institutions or
              immigration authorities
            </li>
            <li>Delays caused by third parties or government agencies</li>
            <li>Changes in government policies or regulations</li>
            <li>Accuracy of information provided by third parties</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
          <p>We reserve the right to terminate services if:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>False information is provided</li>
            <li>Terms and conditions are violated</li>
            <li>Fees are not paid as agreed</li>
            <li>Illegal activities are suspected</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Updates to Terms</h2>
          <p>
            We reserve the right to update these terms and conditions at any
            time. Continued use of our services after such changes constitutes
            acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            10. Contact Information
          </h2>
          <p>
            For any questions or concerns regarding these terms, please contact
            us at:
          </p>
          <div className="mt-2">
            <p>Email: info@studyjetglobal.com</p>
            <p>Phone: +1234567890</p>
            <p>Address: [Your Business Address]</p>
          </div>
        </section>

        <div className="mt-8 border-t pt-6">
          <p className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
