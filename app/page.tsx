"use client";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusChip } from "@/components/status-chip";
import { Button } from "@fluentui/react-components";
import {
  ArrowRight20Regular,
  Checkmark16Regular,
  DocumentText20Regular,
  Mail20Regular,
  MoneyHand20Regular,
  People20Regular,
  PersonAdd20Regular,
  Warning20Regular,
} from "@fluentui/react-icons";

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        title="Good morning, Nisha"
        description="August payroll is in review. Resolve two exceptions before sending it to Finance."
        actions={<Button appearance="primary" as="a" href="/payroll" icon={<ArrowRight20Regular />}>Open payroll</Button>}
      />

      <section className="stats-grid" aria-label="Payroll summary">
        <div className="stat-cell">
          <div className="stat-label"><span>Estimated payroll</span><MoneyHand20Regular /></div>
          <div className="stat-value">₹84.6L</div>
          <div className="stat-note">Sample data for August 2026</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><span>Active employees</span><People20Regular /></div>
          <div className="stat-value">68</div>
          <div className="stat-note">2 joined this period</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><span>Payroll exceptions</span><Warning20Regular /></div>
          <div className="stat-value">2</div>
          <div className="stat-note">Both require HR review</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><span>Pending increments</span><PersonAdd20Regular /></div>
          <div className="stat-value">4</div>
          <div className="stat-note">Effective from September</div>
        </div>
      </section>

      <div className="dashboard-grid">
        <div className="stack">
          <section className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <h2>August payroll</h2>
                <p>Pay date: 30 August 2026</p>
              </div>
              <StatusChip tone="warning">In review</StatusChip>
            </div>
            <div className="workflow">
              <div className="workflow-step complete">
                <div className="step-marker"><Checkmark16Regular /></div>
                <div><strong>Inputs collected</strong><span>Completed 24 Aug</span></div>
              </div>
              <div className="workflow-step complete">
                <div className="step-marker"><Checkmark16Regular /></div>
                <div><strong>Calculated</strong><span>Completed 25 Aug</span></div>
              </div>
              <div className="workflow-step current">
                <div className="step-marker">3</div>
                <div><strong>HR review</strong><span>2 exceptions open</span></div>
              </div>
              <div className="workflow-step">
                <div className="step-marker">4</div>
                <div><strong>Finance approval</strong><span>Waiting for HR</span></div>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <div className="panel-title"><h2>Needs attention</h2><p>Items blocking this payroll period</p></div>
              <Button appearance="subtle" size="small">View all</Button>
            </div>
            <div className="attention-list">
              <div className="attention-row">
                <div><strong>Missing bank account confirmation</strong><span>Rohan Kulkarni joined a new salary account this month.</span></div>
                <StatusChip tone="danger">Blocking</StatusChip>
              </div>
              <div className="attention-row">
                <div><strong>Professional tax location mismatch</strong><span>Kabir Bhatia&apos;s work location changed from Delhi to Gurugram.</span></div>
                <StatusChip tone="warning">Review</StatusChip>
              </div>
              <div className="attention-row">
                <div><strong>Investment proof window closes soon</strong><span>Seven employees still have declarations without supporting documents.</span></div>
                <StatusChip tone="info">7 employees</StatusChip>
              </div>
            </div>
          </section>
        </div>

        <aside className="panel">
          <div className="panel-header">
            <div className="panel-title"><h2>Recent activity</h2><p>Changes across the workspace</p></div>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon"><MoneyHand20Regular /></div>
              <div><strong>Payroll recalculated</strong><span>Nisha Iyer recalculated 68 employee records 18 minutes ago.</span></div>
            </div>
            <div className="activity-item">
              <div className="activity-icon"><PersonAdd20Regular /></div>
              <div><strong>Increment proposed</strong><span>Arjun Rao submitted a 9.5% revision for Aarav Mehta.</span></div>
            </div>
            <div className="activity-item">
              <div className="activity-icon"><DocumentText20Regular /></div>
              <div><strong>Salary certificate issued</strong><span>Certificate generated for Meera Nair and recorded in the audit log.</span></div>
            </div>
            <div className="activity-item">
              <div className="activity-icon"><Mail20Regular /></div>
              <div><strong>Payslips delivered</strong><span>July payslips were emailed to 66 employees successfully.</span></div>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
