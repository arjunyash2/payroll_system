"use client";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusChip } from "@/components/status-chip";
import { Button } from "@fluentui/react-components";
import { Building20Regular, Mail20Regular, ShieldLock20Regular } from "@fluentui/react-icons";

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHeader title="Settings" description="Configure the organisation, identity, and payroll integrations." />
      <div className="settings-grid">
        <section className="panel">
          <div className="panel-header"><div className="panel-title"><h2>Workspace settings</h2><p>Configuration used across Gnx Payroll</p></div></div>
          <div className="settings-section">
            <h3>Organisation</h3>
            <p>Legal entity and payroll registration details.</p>
            <div className="integration-row">
              <div className="document-name"><div className="doc-icon"><Building20Regular /></div><div><strong>Gnx Solutions Private Limited</strong><span>India payroll entity</span></div></div>
              <Button appearance="secondary" size="small">Manage</Button>
            </div>
          </div>
          <div className="settings-section">
            <h3>Identity and access</h3>
            <p>Single-tenant employee authentication and application permissions.</p>
            <div className="integration-row">
              <div className="document-name"><div className="doc-icon"><ShieldLock20Regular /></div><div><strong>Microsoft Entra ID</strong><span>Tenant configuration required</span></div></div>
              <StatusChip tone="warning">Setup required</StatusChip>
            </div>
          </div>
          <div className="settings-section">
            <h3>Email delivery</h3>
            <p>Secure delivery for payslips, certificates, and payroll notifications.</p>
            <div className="integration-row">
              <div className="document-name"><div className="doc-icon"><Mail20Regular /></div><div><strong>Amazon SES</strong><span>Not connected in sample workspace</span></div></div>
              <Button appearance="secondary" size="small">Connect</Button>
            </div>
          </div>
        </section>

        <aside className="panel">
          <div className="panel-header"><div className="panel-title"><h2>Access roles</h2><p>Planned Entra application roles</p></div></div>
          <div className="panel-body">
            <div className="summary-list">
              <div className="summary-row"><span>HR administrator</span><StatusChip tone="info">3 assigned</StatusChip></div>
              <div className="summary-row"><span>Payroll administrator</span><StatusChip tone="info">2 assigned</StatusChip></div>
              <div className="summary-row"><span>Finance approver</span><StatusChip tone="info">2 assigned</StatusChip></div>
              <div className="summary-row"><span>Auditor</span><StatusChip tone="neutral">0 assigned</StatusChip></div>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
