"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Tooltip } from "@fluentui/react-components";
import {
  ArrowExit20Regular,
  Building20Regular,
  CalendarLtr20Regular,
  ChevronDown16Regular,
  DocumentText20Regular,
  Grid20Regular,
  MoneyCalculator20Regular,
  Navigation20Regular,
  PeopleTeam20Regular,
  PersonArrowRight20Regular,
  Settings20Regular,
  WeatherMoon20Regular,
} from "@fluentui/react-icons";
import { useState, type ReactNode } from "react";

const navItems = [
  { href: "/", label: "Overview", icon: Grid20Regular },
  { href: "/employees", label: "Employees", icon: PeopleTeam20Regular },
  { href: "/payroll", label: "Payroll", icon: MoneyCalculator20Regular },
  { href: "/increments", label: "Increments", icon: PersonArrowRight20Regular },
  { href: "/documents", label: "Documents", icon: DocumentText20Regular },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const signOut = async () => {
    await fetch("/api/demo-logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  };

  return (
    <div className="app-frame">
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">G</div>
          <div>
            <strong>Gnx Payroll</strong>
            <span>People operations</span>
          </div>
        </div>

        <div className="workspace-switcher">
          <Building20Regular />
          <div><strong>Gnx Solutions</strong><span>India entity</span></div>
          <ChevronDown16Regular />
        </div>

        <nav className="primary-nav" aria-label="Primary navigation">
          <span className="nav-label">Workspace</span>
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "nav-item active" : "nav-item"}
                onClick={() => setMobileOpen(false)}
              >
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <Link href="/settings" className={pathname === "/settings" ? "nav-item active" : "nav-item"}>
            <Settings20Regular />
            <span>Settings</span>
          </Link>
          <div className="sidebar-profile">
            <div className="avatar avatar-small">SH</div>
            <div><strong>Sumi H</strong><span>Payroll admin</span></div>
            <Tooltip content="Sign out" relationship="label">
              <Button appearance="subtle" icon={<ArrowExit20Regular />} aria-label="Sign out" onClick={signOut} />
            </Tooltip>
          </div>
        </div>
      </aside>

      {mobileOpen ? <button className="sidebar-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} /> : null}

      <div className="main-column">
        <div className="topbar">
          <Button
            className="mobile-menu"
            appearance="subtle"
            icon={<Navigation20Regular />}
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
          />
          <div className="period-control">
            <CalendarLtr20Regular />
            <span>Payroll period</span>
            <strong>August 2026</strong>
            <ChevronDown16Regular />
          </div>
          <div className="topbar-actions">
            <span className="demo-label">Sample workspace</span>
            <Tooltip content="Theme follows system settings" relationship="label">
              <Button appearance="subtle" icon={<WeatherMoon20Regular />} aria-label="Theme settings" />
            </Tooltip>
            <div className="avatar">SH</div>
          </div>
        </div>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
