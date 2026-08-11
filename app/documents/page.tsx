"use client";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusChip } from "@/components/status-chip";
import { Button, Dropdown, Input, MessageBar, MessageBarBody, Option } from "@fluentui/react-components";
import { Add20Regular, DocumentPdf20Regular, Mail20Regular, Search20Regular } from "@fluentui/react-icons";
import { useMemo, useState } from "react";

const documents = [
  { id: 1, name: "July 2026 payslip", employee: "Aarav Mehta", type: "Payslip", period: "July 2026", status: "Delivered", updated: "31 Jul 2026" },
  { id: 2, name: "Salary certificate", employee: "Meera Nair", type: "Salary certificate", period: "FY 2026-27", status: "Ready", updated: "26 Aug 2026" },
  { id: 3, name: "Form 16", employee: "Nisha Iyer", type: "Form 16", period: "FY 2025-26", status: "Delivered", updated: "10 Jun 2026" },
  { id: 4, name: "Increment letter", employee: "Sanya Deshmukh", type: "Increment letter", period: "October 2026", status: "Draft", updated: "25 Aug 2026" },
  { id: 5, name: "Annual salary statement", employee: "Kabir Bhatia", type: "Annual statement", period: "FY 2025-26", status: "Ready", updated: "18 Aug 2026" },
];

export default function DocumentsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All documents");
  const [notice, setNotice] = useState<string | null>(null);

  const visibleDocuments = useMemo(() => documents.filter((document) => {
    const matchesQuery = !query || `${document.name} ${document.employee}`.toLowerCase().includes(query.toLowerCase());
    const matchesType = type === "All documents" || document.type === type;
    return matchesQuery && matchesType;
  }), [query, type]);

  return (
    <AppShell>
      <PageHeader
        title="Documents"
        description="Generate, review, and securely deliver payroll and compensation documents."
        actions={<Button appearance="primary" icon={<Add20Regular />}>Generate document</Button>}
      />

      {notice ? <div style={{ marginBottom: 14 }}><MessageBar intent="success"><MessageBarBody>{notice}</MessageBarBody></MessageBar></div> : null}

      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-wrap">
            <Input value={query} onChange={(_, data) => setQuery(data.value)} contentBefore={<Search20Regular />} placeholder="Search documents" aria-label="Search documents" />
          </div>
          <Dropdown value={type} selectedOptions={[type]} onOptionSelect={(_, data) => setType(data.optionValue ?? "All documents")} aria-label="Filter by document type">
            <Option>All documents</Option><Option>Payslip</Option><Option>Salary certificate</Option><Option>Form 16</Option><Option>Increment letter</Option><Option>Annual statement</Option>
          </Dropdown>
        </div>
        <div className="toolbar-right"><StatusChip tone="neutral">{visibleDocuments.length} documents</StatusChip></div>
      </div>

      <section className="panel data-panel">
        <table className="data-table">
          <thead><tr><th>Document</th><th>Employee</th><th>Period</th><th>Updated</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {visibleDocuments.map((document) => (
              <tr key={document.id}>
                <td>
                  <div className="document-name">
                    <div className="doc-icon"><DocumentPdf20Regular /></div>
                    <div><strong>{document.name}</strong><span>{document.type}</span></div>
                  </div>
                </td>
                <td>{document.employee}</td>
                <td>{document.period}</td>
                <td>{document.updated}</td>
                <td><StatusChip tone={document.status === "Delivered" ? "success" : document.status === "Ready" ? "info" : "neutral"}>{document.status}</StatusChip></td>
                <td>
                  <Button
                    appearance="subtle"
                    size="small"
                    icon={<Mail20Regular />}
                    disabled={document.status === "Draft"}
                    onClick={() => setNotice(`${document.name} queued for secure email delivery to ${document.employee}.`)}
                  >
                    Email
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AppShell>
  );
}
