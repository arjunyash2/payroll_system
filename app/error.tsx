"use client";

import { Button } from "@fluentui/react-components";
import { ArrowClockwise20Regular, Warning20Regular } from "@fluentui/react-icons";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="error-page">
      <div className="empty-icon"><Warning20Regular /></div>
      <h1>We could not load this workspace</h1>
      <p>The error was recorded. Try loading the page again.</p>
      <Button appearance="primary" icon={<ArrowClockwise20Regular />} onClick={reset}>Try again</Button>
    </main>
  );
}
