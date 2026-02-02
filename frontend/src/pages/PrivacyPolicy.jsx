export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="bg-[#7BA717] py-24 px-4 text-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold">
          Recykoin Privacy Policy
        </h1>
      </div>

      {/* CONTENT */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-gray-800 leading-relaxed">

          <h2 className="font-semibold mb-6">
            Privacy Policy for Recykoin Application
          </h2>

          <p className="mb-8 text-sm">
            Last updated: 30th May 2023
          </p>

          <p className="mb-8">
            We respect your right to privacy and are devoted to keeping your
            personal information safe. When you use the Recykoin application
            (referred to as the "App"), we may collect, utilize, store, and
            disclose certain sensitive information about you and your device.
            By using the App, you agree to the terms outlined in this Privacy Policy.
          </p>

          {/* INFORMATION WE COLLECT */}
          <h3 className="font-semibold mb-4">Information We Collect:</h3>

          <div className="space-y-4 mb-10">
            <p>
              a. Personal Information: We collect personal information like name,
              email address, phone number, and payment details.
            </p>

            <p>
              b. Recycling Data: When you use the App to engage in recycling
              programs, we collect data on the kind and quantity of recyclables.
            </p>

            <p>
              c. Usage information, such as schedule pickup and time information
              and usage.
            </p>
            <p>
              d. Analytics and Research: In order to enhance the App, create new features, and gain knowledge on recycling trends, we may aggregate and anonymize user data for analytics and research purposes.
            </p>
            <p>
              e.  Legal Compliance: We may use your information to comply with applicable laws, regulations, legal processes, or enforce our rights and protect the security and integrity of the App.
            </p>

          </div>

          {/* HOW WE USE INFO */}
          <h3 className="font-semibold mb-4">How We Use Your Information:</h3>

          <div className="space-y-4 mb-10">
            <p>
              a. To Provide and Improve the App: We use the information we collect
              to deliver and enhance the functionality of the App, personalize your
              experience, and optimize our services.
            </p>

            <p>
              b. Rewards Processing: In order to process your rewards, monitor your
              recycling activity, and get in touch with you about your account, we
              may utilize your personal information, payment information, and
              recycling data.
            </p>
          </div>

          {/* DATA RETENTION */}
          <h3 className="font-semibold mb-4">Data Retention:</h3>
          <p className="mb-10">
            Unless a longer retention time is required or permitted by law, we will
            retain your personal information for as long as it takes to achieve the
            goals mentioned in this Privacy Policy.
          </p>

          {/* DATA SECURITY */}
          <h3 className="font-semibold mb-4">Data Security:</h3>
          <p className="mb-10">
            To prevent unauthorized access, disclosure, alteration, or destruction
            of your personal information, we take reasonable security precautions.
            However, no data transmission over the internet or storage method is
            completely secure, so we cannot guarantee absolute security.
          </p>

          {/* DATA SHARING */}
          <h3 className="font-semibold mb-4">
            Data Sharing and Disclosure:
          </h3>

          <div className="space-y-4 mb-10">
            <p>
              a. Service Providers: Your information might be disclosed to dependable
              third-party service providers who help us run the App, like payment
              processors, data analytics companies, and customer support services.
              These service providers are obligated to protect your information and
              are prohibited from using it for any other purpose.
            </p>

            <p>
              b. Legal Requirements: We may disclose your information to comply with
              applicable laws, regulations, legal processes, or enforce our rights
              and protect the security and integrity of the App.
            </p>
          </div>

          {/* YOUR RIGHTS */}
          <h3 className="font-semibold mb-4">Your Rights:</h3>

          <div className="space-y-4 mb-10">
            <p>
              a. Access and Control: You have the right to access, amend, and/or
              delete the personal data we have about you. You can do this by getting
              in touch with us through the details listed at the end of this privacy
              policy. We will respond to your request within a reasonable timeframe.
            </p>

            <p>
              b. Opt-Out: You can choose to opt-out of receiving promotional
              communications from us by following the unsubscribe instructions
              included in those communications or by contacting us directly.
            </p>
          </div>

          {/* UPDATES */}
          <h3 className="font-semibold mb-4">
            Updates to this Privacy Policy:
          </h3>

          <p className="mb-10">
            We may occasionally update this privacy statement to reflect changes to
            our data practices or evolving legal requirements. Any significant
            revisions will be communicated to you by posting the updated Privacy
            Policy in the App or via other channels of communication. We advise you
            to periodically review our privacy statement.
          </p>

          {/* CONTACT */}
          <h3 className="font-semibold mb-4">Contact Us:</h3>

          <p className="mb-6">
            If you have any questions, concerns, or requests regarding this Privacy
            Policy or our data practices, please contact us at{" "}
            <a
              href="mailto:info@chanjadatti.com"
              className="text-[#7BA717] font-medium hover:underline"
            >
              info@chanjadatti.com
            </a>
          </p>

          <p className="mt-10 text-[#7BA717]">
            By using the Recykoin App, you acknowledge that you have read and
            understood this Privacy Policy and agree to the collection, use, and
            disclosure of your information as described herein.
          </p>

        </div>
      </div>
    </div>
  );
}
