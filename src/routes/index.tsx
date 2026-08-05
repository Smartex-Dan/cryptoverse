import { createFileRoute } from "@tanstack/react-router";

// Routing is handled by react-router-dom inside __root.tsx.
// This route exists so TanStack can match "/". It renders nothing itself.
export const Route = createFileRoute("/")({
  component: () => null,
});
