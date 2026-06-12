// pages/_app.tsx

import "../styles/css/default.css";
import "../styles/css/default.css";
import "../styles/css/layout.css";
import "../styles/css/media-queries.css";
import "../styles/css/magnific-popup.css";
import "../styles/css/profile-card.css";
import "../styles/css/threads.css";
import "../styles/css/projects.css";
import "../styles/css/focus.css";

import Header from "../components/Header";
import { Analytics } from "@vercel/analytics/react";
import type { AppContext, AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isFocusPage = router.pathname.startsWith("/focus");

  const activeLink = {
    active: Component.name,
  };

  return (
    <SessionProvider>
      {!isFocusPage && <Header {...activeLink} />}
      <Component {...pageProps} />
      <Analytics />
    </SessionProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  if (Component.name === "Contact") {
    return {};
  }
  return {};
};
