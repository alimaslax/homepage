import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function FocusPage() {
  return (
    <>
      <Head>
        <title>Focus — Budgeting &amp; Accounting App</title>
        <meta
          name="description"
          content="Focus is a personal budgeting and accounting app. Track spending, manage accounts, and stay on top of your finances."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="focus-page">
        {/* Hero */}
        <section className="focus-hero">
          <div className="focus-app-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>

          <h1>Focus</h1>
          <p className="tagline">
            Your personal budgeting and accounting companion. Track spending,
            manage accounts, and take control of your finances.
          </p>

          <div className="focus-download-section">
            <a
              href="https://play.google.com/store/apps/details?id=com.rayhan.focus"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-store-badge"
              aria-label="Get it on Google Play"
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
              />
            </a>

            <div className="focus-qr-container">
              <p>Scan to download</p>
              <div className="focus-qr-code">
                {/* QR Code SVG pointing to Google Play listing */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  shapeRendering="crispEdges"
                >
                  <rect width="256" height="256" fill="#ffffff" />
                  <g fill="#000000">
                    {/* Finder pattern top-left */}
                    <rect x="16" y="16" width="80" height="80" />
                    <rect x="24" y="24" width="64" height="64" fill="#ffffff" />
                    <rect x="32" y="32" width="48" height="48" />
                    {/* Finder pattern top-right */}
                    <rect x="160" y="16" width="80" height="80" />
                    <rect x="168" y="24" width="64" height="64" fill="#ffffff" />
                    <rect x="176" y="32" width="48" height="48" />
                    {/* Finder pattern bottom-left */}
                    <rect x="16" y="160" width="80" height="80" />
                    <rect x="24" y="168" width="64" height="64" fill="#ffffff" />
                    <rect x="32" y="176" width="48" height="48" />
                    {/* Data modules (simplified representation) */}
                    <rect x="112" y="16" width="8" height="8" />
                    <rect x="128" y="16" width="8" height="8" />
                    <rect x="112" y="32" width="8" height="8" />
                    <rect x="136" y="32" width="8" height="8" />
                    <rect x="112" y="48" width="8" height="8" />
                    <rect x="128" y="48" width="8" height="8" />
                    <rect x="144" y="48" width="8" height="8" />
                    <rect x="112" y="64" width="8" height="8" />
                    <rect x="136" y="64" width="8" height="8" />
                    <rect x="112" y="80" width="8" height="8" />
                    <rect x="128" y="80" width="8" height="8" />
                    <rect x="16" y="112" width="8" height="8" />
                    <rect x="32" y="112" width="8" height="8" />
                    <rect x="48" y="112" width="8" height="8" />
                    <rect x="64" y="112" width="8" height="8" />
                    <rect x="80" y="112" width="8" height="8" />
                    <rect x="112" y="112" width="8" height="8" />
                    <rect x="128" y="112" width="8" height="8" />
                    <rect x="144" y="112" width="8" height="8" />
                    <rect x="160" y="112" width="8" height="8" />
                    <rect x="176" y="112" width="8" height="8" />
                    <rect x="192" y="112" width="8" height="8" />
                    <rect x="208" y="112" width="8" height="8" />
                    <rect x="224" y="112" width="8" height="8" />
                    <rect x="16" y="128" width="8" height="8" />
                    <rect x="48" y="128" width="8" height="8" />
                    <rect x="80" y="128" width="8" height="8" />
                    <rect x="112" y="128" width="8" height="8" />
                    <rect x="144" y="128" width="8" height="8" />
                    <rect x="176" y="128" width="8" height="8" />
                    <rect x="208" y="128" width="8" height="8" />
                    <rect x="112" y="144" width="8" height="8" />
                    <rect x="128" y="144" width="8" height="8" />
                    <rect x="160" y="144" width="8" height="8" />
                    <rect x="176" y="144" width="8" height="8" />
                    <rect x="208" y="144" width="8" height="8" />
                    <rect x="112" y="160" width="8" height="8" />
                    <rect x="144" y="160" width="8" height="8" />
                    <rect x="160" y="160" width="8" height="8" />
                    <rect x="192" y="160" width="8" height="8" />
                    <rect x="224" y="160" width="8" height="8" />
                    <rect x="112" y="176" width="8" height="8" />
                    <rect x="128" y="176" width="8" height="8" />
                    <rect x="160" y="176" width="8" height="8" />
                    <rect x="176" y="176" width="8" height="8" />
                    <rect x="208" y="176" width="8" height="8" />
                    <rect x="224" y="176" width="8" height="8" />
                    <rect x="112" y="192" width="8" height="8" />
                    <rect x="144" y="192" width="8" height="8" />
                    <rect x="176" y="192" width="8" height="8" />
                    <rect x="192" y="192" width="8" height="8" />
                    <rect x="208" y="192" width="8" height="8" />
                    <rect x="112" y="208" width="8" height="8" />
                    <rect x="128" y="208" width="8" height="8" />
                    <rect x="144" y="208" width="8" height="8" />
                    <rect x="160" y="208" width="8" height="8" />
                    <rect x="192" y="208" width="8" height="8" />
                    <rect x="224" y="208" width="8" height="8" />
                    <rect x="112" y="224" width="8" height="8" />
                    <rect x="136" y="224" width="8" height="8" />
                    <rect x="160" y="224" width="8" height="8" />
                    <rect x="176" y="224" width="8" height="8" />
                    <rect x="208" y="224" width="8" height="8" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="focus-features">
          <h2>Everything you need to manage your money</h2>
          <div className="focus-features-grid">
            <div className="focus-feature-card">
              <div className="feature-icon">📊</div>
              <h3>Budget Tracking</h3>
              <p>
                Set budgets by category and track your spending in real time.
                Stay ahead of your financial goals.
              </p>
            </div>
            <div className="focus-feature-card">
              <div className="feature-icon">🏦</div>
              <h3>Account Management</h3>
              <p>
                Connect your financial accounts securely through Plaid. View
                balances and transactions in one place.
              </p>
            </div>
            <div className="focus-feature-card">
              <div className="feature-icon">📈</div>
              <h3>Insights</h3>
              <p>
                Understand your spending patterns with visual breakdowns and
                trends over time.
              </p>
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section className="focus-screenshots">
          <h2>See it in action</h2>
          <div className="focus-screenshots-scroll">
            <div className="focus-screenshot-item">
              <img src="/images/projects/focus1.png" alt="Focus app screenshot 1" />
            </div>
            <div className="focus-screenshot-item">
              <img src="/images/projects/focus2.png" alt="Focus app screenshot 2" />
            </div>
            <div className="focus-screenshot-item">
              <img src="/images/projects/focus3.png" alt="Focus app screenshot 3" />
            </div>
            <div className="focus-screenshot-item">
              <img src="/images/projects/focus4.png" alt="Focus app screenshot 4" />
            </div>
            <div className="focus-screenshot-item">
              <img src="/images/projects/focus5.png" alt="Focus app screenshot 5" />
            </div>
          </div>
        </section>

        {/* Privacy Highlight */}
        <section className="focus-privacy-section">
          <h2>Your data stays yours</h2>
          <p className="privacy-subtitle">
            Focus is built with privacy at its core. We use your data only to
            improve your app experience — nothing else.
          </p>

          <div className="focus-privacy-points">
            <div className="focus-privacy-point">
              <div className="point-icon">🔒</div>
              <p>Your data is never sold to third parties. Ever.</p>
            </div>
            <div className="focus-privacy-point">
              <div className="point-icon">🛡️</div>
              <p>
                Your information never leaves the platform. All data is
                encrypted in transit and at rest.
              </p>
            </div>
            <div className="focus-privacy-point">
              <div className="point-icon">🗑️</div>
              <p>
                Data is retained until you delete your account, or until your
                account is inactive for 180 days.
              </p>
            </div>
            <div className="focus-privacy-point">
              <div className="point-icon">✅</div>
              <p>
                We only use your data to improve your app experience. No ads, no
                tracking, no profiling.
              </p>
            </div>
          </div>

          <Link href="/focus/privacy" className="focus-privacy-link">
            Read our full Privacy Policy →
          </Link>
        </section>

        {/* Footer */}
        <footer className="focus-footer">
          <p>© {new Date().getFullYear()} Rayhan. All rights reserved.</p>
          <Link href="/focus/privacy">Privacy Policy</Link>
        </footer>
      </div>
    </>
  );
}
