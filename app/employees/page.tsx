"use client";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusChip } from "@/components/status-chip";
import { employees, formatInr } from "@/lib/demo-data";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Dropdown,
  Field,
  Input,
  Option,
} from "@fluentui/react-components";
import { Add20Regular, ArrowDownload20Regular, Search20Regular } from "@fluentui/react-icons";
import { useMemo, useState } from "react";

export default function EmployeesPage() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [dialogOpen, setDialogOpen] = useState(false);

  const visibleEmployees = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return employees.filter((employee) => {
      const matchesQuery = !normalized || [employee.name, employee.email, employee.id, employee.role]
        .some((value) => value.toLowerCase().includes(normalized));
      const matchesDepartment = department === "All departments" || employee.department === department;
      return matchesQuery && matchesDepartment;
    });
  }, [query, department]);

  return (
    <AppShell>
      <PageHeader
        title="Employees"
        description="Manage employment details, payroll readiness, and compensation records."
        actions={
          <>
            <Button appearance="secondary" icon={<ArrowDownload20Regular />}>Export</Button>
            <Dialog open={dialogOpen} onOpenChange={(_, data) => setDialogOpen(data.open)}>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="primary" icon={<Add20Regular />}>Add employee</Button>
              </DialogTrigger>
              <DialogSurface>
                <DialogBody>
                  <DialogTitle>Add employee</DialogTitle>
                  <DialogContent>
                    <div style={{ display: "grid", gap: 14, paddingTop: 12 }}>
                      <Field label="Full name" required><Input placeholder="Employee name" /></Field>
                      <Field label="Work email" required><Input type="email" placeholder="name@gnxsolutions.com" /></Field>
                      <Field label="Department" required>
                        <Dropdown placeholder="Select department">
                          <Option>Engineering</Option><Option>Finance</Option><Option>People</Option><Option>Delivery</Option>
                        </Dropdown>
                      </Field>
                      <Field label="Joining date" required><Input type="date" /></Field>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <DialogTrigger disableButtonEnhancement><Button appearance="secondary">Cancel</Button></DialogTrigger>
                    <Button appearance="primary" onClick={() => setDialogOpen(false)}>Save employee</Button>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
          </>
        }
      />

      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-wrap">
            <Input
              value={query}
              onChange={(_, data) => setQuery(data.value)}
              contentBefore={<Search20Regular />}
              placeholder="Search employees"
              aria-label="Search employees"
            />
          </div>
          <Dropdown
            value={department}
            selectedOptions={[department]}
            onOptionSelect={(_, data) => setDepartment(data.optionValue ?? "All departments")}
            aria-label="Filter by department"
          >
            <Option>All departments</Option>
            <Option>Engineering</Option>
            <Option>People</Option>
            <Option>Finance</Option>
            <Option>Customer Success</Option>
            <Option>Delivery</Option>
            <Option>Design</Option>
          </Dropdown>
        </div>
        <div className="toolbar-right"><StatusChip tone="neutral">{visibleEmployees.length} shown</StatusChip></div>
      </div>

      <section className="panel data-panel">
        {visibleEmployees.length ? (
          <table className="data-table">
            <thead><tr><th>Employee</th><th>Department</th><th>Location</th><th>Joined</th><th>Annual CTC</th><th>Payroll status</th></tr></thead>
            <tbody>
              {visibleEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="person-cell">
                      <div className="table-avatar">{employee.initials}</div>
                      <div><strong>{employee.name}</strong><span>{employee.role} · {employee.id}</span></div>
                    </div>
                  </td>
                  <td>{employee.department}</td>
                  <td>{employee.location}</td>
                  <td>{employee.joined}</td>
                  <td className="numeric">{formatInr(employee.annualCtc)}</td>
                  <td><StatusChip tone={employee.payrollStatus === "Ready" ? "success" : employee.payrollStatus === "Review" ? "warning" : "danger"}>{employee.payrollStatus}</StatusChip></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-icon"><Search20Regular /></div>
            <h3>No employees found</h3>
            <p>Try another name, employee ID, or department filter.</p>
            <Button appearance="secondary" onClick={() => { setQuery(""); setDepartment("All departments"); }}>Clear filters</Button>
          </div>
        )}
      </section>
    </AppShell>
  );
}
