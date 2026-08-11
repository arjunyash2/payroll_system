"use client";

import { Button, Field, Input, MessageBar, MessageBarBody } from "@fluentui/react-components";
import { ArrowRight20Regular, Eye20Regular, EyeOff20Regular } from "@fluentui/react-icons";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const demoEmail = "hr.demo@gnxsolutions.com";
const demoPassword = "GnxDemo@2026";

export function DemoSignIn() {
  const router = useRouter();
  const [email, setEmail] = useState(demoEmail);
  const [password, setPassword] = useState(demoPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as { error?: string; redirectTo?: string };

      if (!response.ok) {
        setError(result.error ?? "The demo account could not be signed in.");
        return;
      }

      router.replace(result.redirectTo ?? "/");
      router.refresh();
    } catch {
      setError("The demo service is unavailable. Try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="login-actions" onSubmit={submit}>
      <div className="demo-access-card">
        <strong>HR test account</strong>
        <span>Sample employee and payroll data only</span>
      </div>
      <Field label="Work email" required>
        <Input
          id="demo-email"
          aria-label="Work email"
          type="email"
          value={email}
          onChange={(_, data) => setEmail(data.value)}
          autoComplete="username"
        />
      </Field>
      <Field label="Password" required>
        <Input
          id="demo-password"
          aria-label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(_, data) => setPassword(data.value)}
          autoComplete="current-password"
          contentAfter={
            <Button
              type="button"
              appearance="transparent"
              size="small"
              icon={showPassword ? <EyeOff20Regular /> : <Eye20Regular />}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((visible) => !visible)}
            />
          }
        />
      </Field>
      <Button type="submit" size="large" appearance="primary" icon={<ArrowRight20Regular />} disabled={pending}>
        {pending ? "Signing in" : "Sign in as HR admin"}
      </Button>
      {error ? (
        <MessageBar intent="error">
          <MessageBarBody>{error}</MessageBarBody>
        </MessageBar>
      ) : null}
      <p className="login-help">The session lasts eight hours. Do not enter real employee information in this demo.</p>
    </form>
  );
}
