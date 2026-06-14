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
              <img
                src="/images/focus/icon.png"
                alt="Focus app icon"
                className="focus-app-icon-img"
              />
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
            </div>

            {/* Finance-themed hero graphic */}
            <div className="focus-hero-graphic">
              <img
                src="/images/focus/budget.png"
                alt="Budget tracking interface"
                className="focus-hero-img"
              />
              <img
                src="/images/focus/finance.png"
                alt="Finance overview"
                className="focus-hero-img"
              />
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
            <div className="focus-feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Alerts</h3>
              <p>
                Get notified when you&apos;re close to budget limits or when
                unusual transactions occur.
              </p>
            </div>
            <div className="focus-feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Goals</h3>
              <p>
                Set savings goals and track progress. Stay motivated with visual
                milestones.
              </p>
            </div>
            <div className="focus-feature-card">
              <div className="feature-icon">📱</div>
              <h3>Cross-Platform</h3>
              <p>
                Available on Android with iOS coming soon. Your data syncs
                across all your devices.
              </p>
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
