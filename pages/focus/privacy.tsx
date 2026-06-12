import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function FocusPrivacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Focus</title>
        <meta
          name="description"
          content="Privacy Policy for Focus, a personal budgeting and accounting app by Rayhan."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="focus-privacy-page">
        <div className="focus-privacy-container">
          <Link href="/focus" className="focus-back-link">
            ← Back to Focus
          </Link>

          <h1>Privacy Policy</h1>
          <p className="effective-date">Effective Date: November 1, 2025</p>

          <h2>Overview</h2>
          <p>
            Focus is a personal budgeting and accounting application developed
            by Rayhan. We are committed to protecting your privacy and ensuring
            your data is handled responsibly.
          </p>
          <p>
            This policy explains what data we collect, how we use it, and your
            rights regarding your information.
          </p>

          <h2>What We Collect</h2>
          <p>
            Focus may collect the following information to provide app
            functionality:
          </p>
          <ul>
            <li>Account information (email, display name)</li>
            <li>
              Financial account data accessed through Plaid (balances,
              transactions)
            </li>
            <li>App usage data to improve your experience</li>
          </ul>

          <h2>What We Do NOT Collect</h2>
          <ul>
            <li>We do not collect or store your banking credentials</li>
            <li>
              We do not collect data for advertising or marketing purposes
            </li>
            <li>We do not track you across other apps or websites</li>
          </ul>

          <h2>How We Use Your Data</h2>
          <p>
            Your data is used exclusively to provide and improve your app
            experience. This includes displaying your financial information,
            generating budgeting insights, and improving app performance.
          </p>
          <p>
            <strong>
              We do not sell, rent, or share your data with third parties.
            </strong>
          </p>
          <p>Your data never leaves the platform.</p>

          <h2>Data Retention</h2>
          <p>Your data is retained under the following terms:</p>
          <ul>
            <li>
              Data is kept while your account is active and you are using the
              app
            </li>
            <li>
              You can delete your account and all associated data at any time
            </li>
            <li>
              If your account is inactive for 180 days, your data will be
              automatically deleted
            </li>
          </ul>
          <p>
            We do not retain data beyond what is necessary to provide the
            service.
          </p>

          <h2>Security</h2>
          <p>
            All data is encrypted in transit using HTTPS/TLS 1.2+ and encrypted
            at rest through our cloud infrastructure. Access to production
            systems is restricted to authorized personnel with multi-factor
            authentication.
          </p>

          <h2>Financial Data</h2>
          <p>
            Focus accesses financial account information exclusively through
            Plaid APIs. Your banking credentials are entered directly through
            Plaid Link and handled by Plaid&apos;s secure infrastructure — Focus
            never sees or stores them.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            Focus uses the following services to operate:
          </p>
          <ul>
            <li>Supabase — Authentication and database</li>
            <li>Plaid — Financial account connectivity</li>
            <li>Google Cloud Platform — Infrastructure hosting</li>
          </ul>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your account and all associated data</li>
            <li>Disconnect financial accounts at any time</li>
          </ul>

          <h2>Contact</h2>
          <p>
            For any privacy-related questions or data requests, contact us
            through the app or at{" "}
            <a href="mailto:privacy@rayhan.dev">privacy@rayhan.dev</a>.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            This policy may be updated periodically. We will notify users of
            significant changes through the app.
          </p>

          <p style={{ marginTop: "48px", color: "#52525b", fontSize: "13px" }}>
            Business: Rayhan · Application: Focus · Version: 1.3 · Last
            Updated: November 2025
          </p>
        </div>
      </div>
    </>
  );
}
