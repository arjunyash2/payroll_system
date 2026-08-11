import "server-only";

import { jwtVerify, SignJWT } from "jose";

export const DEMO_HR_EMAIL = "hr.demo@gnxsolutions.com";
export const DEMO_HR_PASSWORD = "GnxDemo@2026";
export const DEMO_SESSION_COOKIE = "gnx_demo_session";

const getSessionKey = () => {
  const configuredSecret = process.env.DEMO_SESSION_SECRET;

  if (!configuredSecret && process.env.NODE_ENV === "production") {
    throw new Error("DEMO_SESSION_SECRET must be configured in production.");
  }

  return new TextEncoder().encode(
    configuredSecret ?? "local-demo-only-secret-change-before-deploying",
  );
};

export async function createDemoSession() {
  return new SignJWT({ role: "hr_admin", name: "Nisha Iyer" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("demo-hr")
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSessionKey());
}

export async function verifyDemoSession(token?: string) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSessionKey(), {
      algorithms: ["HS256"],
    });

    return payload.sub === "demo-hr" && payload.role === "hr_admin" ? payload : null;
  } catch {
    return null;
  }
}
