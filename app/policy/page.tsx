import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto my-16 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Effective Date: May 1, 2025
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              I (Shuacap Studio) value your privacy and am committed to
              protecting your personal data. This Privacy Policy explains how I
              collect, use, and share information when you use my services or
              visit my website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              2. Information I Collect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
              <li>
                <strong>Contact Information:</strong> Name, email.
              </li>
              <li>
                <strong>Project Details:</strong> Requirements, preferences, and
                materials you provide.
              </li>
              <li>
                <strong>Payment Details:</strong> Billing address, credit/debit
                card information, and transaction history.
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, browser type, pages
                visited, and session duration.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              3. How I Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              I use collected information to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
              <li>
                Provide and maintain services (e.g., project delivery, support).
              </li>
              <li>Process payments securely and manage billing inquiries.</li>
              <li>Personalise your experience and respond to inquiries.</li>
              <li>Analyse usage to improve website and Services.</li>
              <li>
                Send administrative and promotional communications (if you opt
                in).
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              4. Sharing Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              I do not sell or rent your personal data. I may share information
              with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
              <li>
                Service Providers: Third-party tools for payment processing,
                hosting, analytics, and communications.
              </li>
              <li>
                Legal Authorities: When required by law or to protect rights.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              5. Cookies &amp; Tracking
            </h2>
            <p className="text-gray-700 leading-relaxed">
              I use cookies and similar tracking technologies to track activity
              on my website and store certain information. You can instruct your
              browser to refuse cookies, but some features, including payment
              gateways, may not function properly.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              6. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              I implement reasonable security measures to protect your data,
              including encryption for payment information. However, no method
              of transmission or storage is completely secure, so I cannot
              guarantee absolute security.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              7. Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, correct, or delete your personal
              data. To exercise these rights, contact me using the information
              below. You may also have the right to withdraw consent to
              processing of your data where applicable.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              8. Third-Party Links
            </h2>
            <p className="text-gray-700 leading-relaxed">
              My site may contain links to third-party websites. I am not
              responsible for their privacy practices. Please review the privacy
              policies of those sites.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              9. Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              I may update this Privacy Policy at any time. Changes will be
              posted on this page with a new effective date. Continued use after
              changes indicates acceptance.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              10. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For questions, please contact:
              <br />
              <span className="font-medium">Joshua Capito</span> (Sole Trader)
              <br />
              trading as Shuacap Studio
              <br />
              Email:{" "}
              <a
                href="mailto:joshuaecapito22@gmail.com"
                className="text-blue-600 hover:underline"
              >
                joshuaecapito22@gmail.com
              </a>
              <br />
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
