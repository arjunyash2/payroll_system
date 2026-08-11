"use client";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusChip } from "@/components/status-chip";
import { Button, MessageBar, MessageBarBody } from "@fluentui/react-components";
import { Add20Regular, ArrowRight20Regular, Checkmark20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import { useState } from "react";

const initialProposals = [
  { id: 1, initials: "AM", name: "Aarav Mehta", role: "Senior Product Engineer", current: "₹18,40,000", proposed: "₹20,14,800", change: "9.5%", effective: "1 September 2026", status: "Pending approval" },
  { id: 2, initials: "MN", name: "Meera Nair", role: "Customer Success Lead", current: "₹14,80,000", proposed: "₹16,28,000", change: "10%", effective: "1 September 2026", status: "Pending approval" },
  { id: 3, initials: "SD", name: "Sanya Deshmukh", role: "Product Designer", current: "₹12,50,000", proposed: "₹13,50,000", change: "8%", effective: "1 October 2026", status: "Draft" },
  { id: 4, initials: "KB", name: "Kabir Bhatia", role: "Finance Analyst", current: "₹11,60,000", proposed: "₹12,52,800", change: "8%", effective: "1 October 2026", status: "Pending approval" },
];

export default function IncrementsPage() {
  const [proposals, setProposals] = useState(initialProposals);
  const [notice, setNotice] = useState<string | null>(null);

  const updateProposal = (id: number, status: string) => {
    const proposal = proposals.find((item) => item.id === id);
    setProposals((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    setNotice(`${proposal?.name}'s increment was ${status.toLowerCase()}.`);
  };

  return (
    <AppShell>
      <PageHeader
        title="Increments"
        description="Propose, approve, and schedule compensation revisions with a complete history."
        actions={<Button appearance="primary" icon={<Add20Regular />}>Propose increment</Button>}
      />

      {notice ? <div style={{ marginBottom: 14 }}><MessageBar intent="success"><MessageBarBody>{notice}</MessageBarBody></MessageBar></div> : null}

      <div className="toolbar">
        <div className="toolbar-left">
          <Button appearance="primary" size="small">Open proposals</Button>
          <Button appearance="subtle" size="small">Scheduled</Button>
          <Button appearance="subtle" size="small">History</Button>
        </div>
        <div className="toolbar-right"><StatusChip tone="neutral">{proposals.filter((item) => item.status === "Pending approval").length} awaiting approval</StatusChip></div>
      </div>

      <section className="increment-grid">
        {proposals.map((proposal) => (
          <article className="increment-item" key={proposal.id}>
            <div className="increment-top">
              <div className="increment-person">
                <div className="table-avatar">{proposal.initials}</div>
                <div><strong>{proposal.name}</strong><span>{proposal.role}</span></div>
              </div>
              <StatusChip tone={proposal.status === "Approved" ? "success" : proposal.status === "Declined" ? "danger" : proposal.status === "Draft" ? "neutral" : "warning"}>{proposal.status}</StatusChip>
            </div>
            <div className="increment-values">
              <div><span>Current CTC</span><strong>{proposal.current}</strong></div>
              <ArrowRight20Regular className="increment-arrow" />
              <div><span>Proposed CTC</span><strong>{proposal.proposed}</strong></div>
            </div>
            <div className="increment-footer">
              <span>{proposal.change} increase, effective {proposal.effective}</span>
              {proposal.status === "Pending approval" ? (
                <div>
                  <Button appearance="subtle" size="small" icon={<Dismiss20Regular />} onClick={() => updateProposal(proposal.id, "Declined")}>Decline</Button>
                  <Button appearance="primary" size="small" icon={<Checkmark20Regular />} onClick={() => updateProposal(proposal.id, "Approved")}>Approve</Button>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
