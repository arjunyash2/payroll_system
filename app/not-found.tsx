"use client";

import { Button } from "@fluentui/react-components";
import { Home20Regular } from "@fluentui/react-icons";

export default function NotFoundPage() {
  return (
    <main className="error-page">
      <div className="brand-mark" aria-hidden="true">G</div>
      <h1>Page not found</h1>
      <p>The page may have moved or you may not have access to it.</p>
      <Button appearance="primary" icon={<Home20Regular />} as="a" href="/">Return to overview</Button>
    </main>
  );
}
