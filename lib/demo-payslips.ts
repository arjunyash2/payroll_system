import { employees, payrollRows } from "@/lib/demo-data";

export type DemoPayslip = {
  employeeId: string;
  slug: string;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
  status: "Ready" | "Review" | "On hold";
  bankAccount: string;
  pan: string;
  uan: string;
  earnings: Array<{ label: string; amount: number }>;
  deductions: Array<{ label: string; amount: number }>;
  gross: number;
  totalDeductions: number;
  net: number;
};

const identityDetails: Record<string, { bankAccount: string; pan: string; uan: string }> = {
  "GNX-0042": { bankAccount: "•••• 1842", pan: "ABCPM••42K", uan: "1008••••4201" },
  "GNX-0057": { bankAccount: "•••• 3057", pan: "DFGPI••57M", uan: "1008••••5702" },
  "GNX-0064": { bankAccount: "•••• 7264", pan: "HJKPB••64R", uan: "1008••••6403" },
  "GNX-0071": { bankAccount: "•••• 9171", pan: "LMNPN••71T", uan: "1008••••7104" },
  "GNX-0086": { bankAccount: "Verification pending", pan: "PQRPK••86V", uan: "1008••••8605" },
};

export const demoPayslips: DemoPayslip[] = payrollRows.map((payroll) => {
  const employee = employees.find((record) => record.name === payroll.name);

  if (!employee) {
    throw new Error(`Missing employee record for ${payroll.name}`);
  }

  const basic = Math.round(payroll.gross * 0.5);
  const houseRentAllowance = Math.round(payroll.gross * 0.25);
  const specialAllowance = payroll.gross - basic - houseRentAllowance;
  const providentFund = 1_800;
  const professionalTax = 200;
  const incomeTax = payroll.deductions - providentFund - professionalTax;

  return {
    employeeId: employee.id,
    slug: employee.id.toLowerCase(),
    name: employee.name,
    role: employee.role,
    department: employee.department,
    location: employee.location,
    email: employee.email,
    status: employee.payrollStatus,
    ...identityDetails[employee.id],
    earnings: [
      { label: "Basic salary", amount: basic },
      { label: "House rent allowance", amount: houseRentAllowance },
      { label: "Special allowance", amount: specialAllowance },
    ],
    deductions: [
      { label: "Provident fund", amount: providentFund },
      { label: "Professional tax", amount: professionalTax },
      { label: "Income tax (TDS)", amount: incomeTax },
    ],
    gross: payroll.gross,
    totalDeductions: payroll.deductions,
    net: payroll.net,
  };
});

export const getDemoPayslip = (slug: string | null) =>
  demoPayslips.find((payslip) => payslip.slug === slug?.toLowerCase());
