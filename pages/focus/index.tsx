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
          <img
            src="/images/focus/icon.png"
            alt="Focus app icon"
            className="focus-app-icon-img"
          />
          <h1>Focus</h1>
          <p className="focus-tagline">
            Take control of your finances. Track spending, manage budgets,
            and get real-time insights — all in one app.
          </p>
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
        </section>

        {/* App Preview */}
        <section className="focus-preview">
          <div className="focus-preview-images">
            <img
              src="/images/focus/finance.png"
              alt="Focus finance dashboard"
              className="focus-preview-img"
            />
            <img
              src="/images/focus/budget.png"
              alt="Focus budget tracking"
              className="focus-preview-img"
            />
          </div>
        </section>

        {/* Features */}
        <section className="focus-features">
          <h2>Everything you need</h2>
          <p className="focus-features-sub">
            Simple tools to manage your money, built with privacy in mind.
          </p>
          <div className="focus-features-grid">
            <div className="focus-feature-card">
              <div className="feature-icon">📊</div>
              <h3>Budget Tracking</h3>
              <p>
                Set budgets by category and track spending in real time.
              </p>
            </div>
            <div className="focus-feature-card">
              <div className="feature-icon">🏦</div>
              <h3>Account Sync</h3>
              <p>
                Connect financial accounts securely through Plaid.
              </p>
            </div>
            <div className="focus-feature-card">
              <div className="feature-icon">📈</div>
              <h3>Insights</h3>
              <p>
                Visual breakdowns and trends of your spending patterns.
              </p>
            </div>
            <div className="focus-feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Alerts</h3>
              <p>
                Notified when close to limits or unusual activity.
              </p>
            </div>
            <div className="focus-feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Goals</h3>
              <p>
                Set savings goals and track progress visually.
              </p>
            </div>
            <div className="focus-feature-card">
              <div className="feature-icon">📱</div>
              <h3>Cross-Platform</h3>
              <p>
                Android now, iOS coming soon. Syncs everywhere.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="focus-privacy-section">
          <h2>Your data stays yours</h2>
          <p className="focus-privacy-sub">
            We use your data only to improve your app experience. Nothing else.
          </p>
          <div className="focus-privacy-grid">
            <div className="focus-privacy-point">
              <span className="point-icon">🔒</span>
              <div>
                <h4>Never sold</h4>
                <p>Your data is never sold to third parties. Period.</p>
              </div>
            </div>
            <div className="focus-privacy-point">
              <span className="point-icon">🛡️</span>
              <div>
                <h4>Never leaves the platform</h4>
                <p>All data encrypted in transit and at rest.</p>
              </div>
            </div>
            <div className="focus-privacy-point">
              <span className="point-icon">⏱️</span>
              <div>
                <h4>You control retention</h4>
                <p>Delete anytime, or auto-deleted after 180 days inactive.</p>
              </div>
            </div>
            <div className="focus-privacy-point">
              <span className="point-icon">✅</span>
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
