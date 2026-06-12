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
          <div className="focus-hero-content">
            <div className="focus-hero-text">
              <div className="focus-badge">Budgeting &amp; Accounting</div>
              <h1>Focus</h1>
              <p className="tagline">
                Take control of your finances. Track spending, manage budgets,
                and get real-time insights — all in one app.
              </p>

              <div className="focus-download-row">
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
              </div>

              <div className="focus-qr-wrapper">
                <div className="focus-qr-box">
                  <img
                    src="/images/focus-app/qr-code.png"
                    alt="QR code to download Focus"
                    onError={(e) => {
                      // Fallback if QR image doesn't exist
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <span className="focus-qr-label">Scan to download</span>
              </div>
            </div>

            <div className="focus-hero-phones">
              <div className="focus-phone focus-phone-back">
                <img
                  src="/images/projects/focus2.png"
                  alt="Focus app - accounts view"
                />
              </div>
              <div className="focus-phone focus-phone-front">
                <img
                  src="/images/projects/focus1.png"
                  alt="Focus app - dashboard"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="focus-features">
          <div className="focus-section-header">
            <h2>Everything you need</h2>
            <p>Simple tools to manage your money, built with privacy in mind.</p>
          </div>
          <div className="focus-features-grid">
            <div className="focus-feature-card">
              <div className="feature-icon">📊</div>
              <h3>Budget Tracking</h3>
              <p>
                Set budgets by category and track spending in real time. Never
                overspend again.
              </p>
            </div>
            <div className="focus-feature-card">
              <div className="feature-icon">🏦</div>
              <h3>Account Sync</h3>
              <p>
                Securely connect financial accounts through Plaid. All your
                balances in one place.
              </p>
            </div>
            <div className="focus-feature-card">
              <div className="feature-icon">📈</div>
              <h3>Insights</h3>
              <p>
                Understand your spending patterns with clear visual breakdowns
                and monthly trends.
              </p>
            </div>
          </div>
        </section>

        {/* App Screenshots */}
        <section className="focus-showcase">
          <div className="focus-section-header">
            <h2>See it in action</h2>
          </div>
          <div className="focus-showcase-grid">
            <div className="focus-showcase-item">
              <img src="/images/projects/focus1.png" alt="Dashboard" />
            </div>
            <div className="focus-showcase-item">
              <img src="/images/projects/focus2.png" alt="Accounts" />
            </div>
            <div className="focus-showcase-item">
              <img src="/images/projects/focus3.png" alt="Transactions" />
            </div>
            <div className="focus-showcase-item">
              <img src="/images/projects/focus4.png" alt="Budget" />
            </div>
            <div className="focus-showcase-item">
              <img src="/images/projects/focus5.png" alt="Insights" />
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="focus-privacy-section">
          <div className="focus-section-header">
            <h2>Your data stays yours</h2>
            <p>
              We use your data only to improve your app experience. Nothing
              else.
            </p>
          </div>

          <div className="focus-privacy-grid">
            <div className="focus-privacy-point">
              <div className="point-icon">🔒</div>
              <div>
                <h4>Never sold</h4>
                <p>Your data is never sold to third parties. Period.</p>
              </div>
            </div>
            <div className="focus-privacy-point">
              <div className="point-icon">🛡️</div>
              <div>
                <h4>Never leaves the platform</h4>
                <p>All data encrypted in transit and at rest.</p>
              </div>
            </div>
            <div className="focus-privacy-point">
              <div className="point-icon">⏱️</div>
              <div>
                <h4>You control retention</h4>
                <p>Delete anytime, or auto-deleted after 180 days inactive.</p>
              </div>
            </div>
            <div className="focus-privacy-point">
              <div className="point-icon">✅</div>
              <div>
                <h4>No ads. No tracking.</h4>
                <p>We only use data to improve your experience.</p>
              </div>
            </div>
          </div>

          <Link href="/focus/privacy" className="focus-privacy-link">
            Read full Privacy Policy →
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
