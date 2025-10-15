import React from "react";

const TermsOfService = () => {
  return (
    <main className="max-w-4xl mx-auto pt-28 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-20">
        <div className="px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Effective Date: May 1, 2025
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using the services provided by me (Shuacap
              Studio), including sports videography, web development, and
              related content (<span className="italic">"Services"</span>), you
              agree to be bound by these Terms of Service (
              <span className="italic">"Terms"</span>). If you do not agree with
              any portion of these Terms, you may not use the Services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              2. Description of Services
            </h2>
            <p className="text-gray-700 leading-relaxed">
              I provide professional sports videography, web development, and
              digital content creation on a freelance basis. Specific
              deliverables, timelines, and pricing are detailed in individual
              project proposals or contracts.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              3. Client Responsibilities
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
              <li>
                Provide accurate information and materials needed to complete
                the Services.
              </li>
              <li>Respond promptly to requests, approvals, and feedback.</li>
              <li>
                Use the deliverables lawfully and in accordance with these
                Terms.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              4. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              I retain ownership of all original content, including videos,
              images, code, and documentation (
              <span className="italic">"Work"</span>). Upon full payment, I
              grant you a non-exclusive, perpetual license to use the Work for
              its intended purpose. Any additional uses require my written
              permission.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              5. Payment Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              A non-refundable deposit as outlined in the project proposal is
              required to confirm booking. Final payment is due within 30 days
              of invoice. Late payments may incur a 5% monthly fee on
              outstanding balances.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              6. Warranties &amp; Disclaimer
            </h2>
            <p className="text-gray-700 leading-relaxed">
              I strive to deliver high-quality Services, but all Services and
              Work are provided
              <span className="italic"> "as is"</span> without warranties of any
              kind. I disclaim all warranties, express or implied, including but
              not limited to merchantability and fitness for a particular
              purpose.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To the fullest extent permitted by law, I am not liable for any
              indirect, incidental, consequential, or punitive damages arising
              out of or relating to these Terms or your use of the Services,
              even if advised of such possibility.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              8. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms and any dispute arising out of or relating to them
              shall be governed by and construed in accordance with the laws of
              England and Wales, without regard to conflict of laws principles.
              You and I agree to submit to the non-exclusive jurisdiction of the
              courts of England and Wales to resolve any dispute.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              9. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              I may update these Terms at any time by revising this page. Your
              continued use of the Services after changes indicates your
              acceptance of the updated Terms.
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
                href="mailto:shuacapstudio@gmail.com"
                className="text-blue-600 hover:underline"
              >
                shuacapstudio@gmail.com
              </a>
              <br />
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
