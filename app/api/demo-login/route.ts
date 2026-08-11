import {
  createDemoSession,
  DEMO_HR_EMAIL,
  DEMO_HR_PASSWORD,
  DEMO_SESSION_COOKIE,
} from "@/lib/demo-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter the demo email and password." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";

  if (email !== DEMO_HR_EMAIL || password !== DEMO_HR_PASSWORD) {
    return NextResponse.json({ error: "The demo credentials are incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true, redirectTo: "/" });
  response.cookies.set(DEMO_SESSION_COOKIE, await createDemoSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  return response;
}
