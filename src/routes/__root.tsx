import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import appCss from "../styles.css?url";
// @ts-expect-error - JS module without types
import App from "../App";
// @ts-expect-error - JS module without types
import store from "../app/store";

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ maxWidth: "28rem", textAlign: "center" }}>
        <h1>This page didn't load</h1>
        <p>Something went wrong on our end. You can try refreshing or head back home.</p>
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <a href="/">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cryptoverse — Live Crypto Prices, Stats & News" },
      { name: "description", content: "Track live cryptocurrency prices, market stats, exchanges, and the latest crypto news." },
      { property: "og:title", content: "Cryptoverse — Live Crypto Prices, Stats & News" },
      { property: "og:description", content: "Track live cryptocurrency prices, market stats, exchanges, and the latest crypto news." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  // BrowserRouter needs `document`, so only mount after hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
