import { createFileRoute } from "@tanstack/react-router";

// Splat route so TanStack matches every non-root URL. Actual routing is
// handled by react-router-dom inside __root.tsx, so this renders nothing.
export const Route = createFileRoute("/$")({
  component: () => null,
});
