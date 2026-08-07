import { createFileRoute } from "@tanstack/react-router";

// The real page routing is handled by react-router-dom inside __root.tsx
// (see src/App.jsx). This file route only needs to exist so "/" is a
// recognized match instead of falling through to the $.tsx splat.
export const Route = createFileRoute("/")({
  component: () => null,
});
