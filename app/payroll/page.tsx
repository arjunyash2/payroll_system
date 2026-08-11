"use client";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusChip } from "@/components/status-chip";
import { formatInr, payrollRows } from "@/lib/demo-data";
import { Button, MessageBar, MessageBarBody, Spinner } from "@fluentui/react-components";
import { Calculator20Regular, Checkmark16Regular, Send20Regular, Warning20Regular } from "@fluentui/react-icons";
import { useState } from "react";

const stages = ["Inputs", "Calculation", "HR review", "Finance approval"];

export default function PayrollPage() {
  const [stage, setStage] = useState(2);
  const [calculating, setCalculating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const recalculate = () => {
    setCalculating(true);
    setNotice(null);
    window.setTimeout(() => {
      setCalculating(false);
      setNotice("Payroll recalculated. Two employee records still need attention.");
    }, 900);
  };

  const submit = () => {
    setStage(3);
    setNotice("Payroll submitted to Finance for approval.");
  };

  const totalGross = payrollRows.reduce((sum, row) => sum + row.gross, 0);
  const totalDeductions = payrollRows.reduce((sum, row) => sum + row.deductions, 0);
  const totalNet = payrollRows.reduce((sum, row) => sum + row.net, 0);

  return (
    <AppShell>
      <PageHeader
        title="August payroll"
        description="Review calculations, resolve exceptions, and send the period for Finance approval."
        actions={
          <>
            <Button appearance="secondary" icon={calculating ? <Spinner size="tiny" /> : <Calculator20Regular />} onClick={recalculate} disabled={calculating}>
              {calculating ? "Calculating" : "Recalculate"}
            </Button>
            <Button appearance="primary" icon={<Send20Regular />} onClick={submit} disabled={stage >= 3}>Send to Finance</Button>
          </>
        }
      />

      {notice ? <div style={{ marginBottom: 14 }}><MessageBar intent="success"><MessageBarBody>{notice}</MessageBarBody></MessageBar></div> : null}

      <section className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-header">
          <div className="panel-title"><h2>Payroll progress</h2><p>Period: 1 August - 31 August 2026</p></div>
          <StatusChip tone={stage >= 3 ? "info" : "warning"}>{stage >= 3 ? "Finance review" : "HR review"}</StatusChip>
        </div>
        <div className="workflow">
          {stages.map((label, index) => (
            <div key={label} className={`workflow-step ${index < stage ? "complete" : index === stage ? "current" : ""}`}>
              <div className="step-marker">{index < stage ? <Checkmark16Regular /> : index + 1}</div>
              <div><strong>{label}</strong><span>{index < stage ? "Completed" : index === stage ? "In progress" : "Not started"}</span></div>
            </div>
          ))}
        </div>
      </section>

      <div className="split-layout">
        <section className="panel data-panel">
          <div className="panel-header">
            <div className="panel-title"><h2>Employee calculations</h2><p>Five sample records from 68 employees</p></div>
            <Button appearance="subtle" size="small">View all 68</Button>
          </div>
          <table className="data-table">
            <thead><tr><th>Employee</th><th style={{ textAlign: "right" }}>Gross pay</th><th style={{ textAlign: "right" }}>Deductions</th><th style={{ textAlign: "right" }}>Net pay</th><th>Status</th></tr></thead>
            <tbody>
              {payrollRows.map((row) => (
                <tr key={row.name}>
                  <td><strong style={{ color: "var(--text)" }}>{row.name}</strong></td>
                  <td className="numeric">{formatInr(row.gross)}</td>
                  <td className="numeric">{formatInr(row.deductions)}</td>
                  <td className="numeric"><strong>{formatInr(row.net)}</strong></td>
                  <td><StatusChip tone={row.status === "Ready" ? "success" : row.status === "Review" ? "warning" : "danger"}>{row.status}</StatusChip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="stack">
          <section className="panel">
            <div className="panel-header"><div className="panel-title"><h2>Period summary</h2><p>Sample calculation subset</p></div></div>
            <div className="panel-body">
              <div className="summary-list">
                <div className="summary-row"><span>Gross pay</span><strong>{formatInr(totalGross)}</strong></div>
                <div className="summary-row"><span>Employee deductions</span><strong>{formatInr(totalDeductions)}</strong></div>
                <div className="summary-row"><span>Employer contributions</span><strong>₹47,840</strong></div>
                <div className="summary-row total"><span>Net disbursement</span><strong>{formatInr(totalNet)}</strong></div>
              </div>
            </div>
          </section>
          <section className="panel">
            <div className="panel-header"><div className="panel-title"><h2>Validation</h2><p>Checks run on the current draft</p></div></div>
            <div className="panel-body">
              <div className="summary-list">
                <div className="summary-row"><span>Passed checks</span><StatusChip tone="success">24</StatusChip></div>
                <div className="summary-row"><span>Warnings</span><StatusChip tone="warning">1</StatusChip></div>
                <div className="summary-row"><span>Blocking errors</span><StatusChip tone="danger">1</StatusChip></div>
              </div>
              <div className="callout"><Warning20Regular /><span>Finance can review this draft, but approval remains blocked until bank details are confirmed.</span></div>
            </div>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
