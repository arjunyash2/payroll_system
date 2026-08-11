export type Employee = {
  id: string;
  name: string;
  initials: string;
  role: string;
  department: string;
  location: string;
  email: string;
  joined: string;
  annualCtc: number;
  payrollStatus: "Ready" | "Review" | "On hold";
};

export const employees: Employee[] = [
  {
    id: "GNX-0042",
    name: "Aarav Mehta",
    initials: "AM",
    role: "Senior Product Engineer",
    department: "Engineering",
    location: "Bengaluru",
    email: "aarav.mehta@gnxsolutions.com",
    joined: "12 Feb 2023",
    annualCtc: 1840000,
    payrollStatus: "Ready",
  },
  {
    id: "GNX-0057",
    name: "Nisha Iyer",
    initials: "NI",
    role: "People Operations Partner",
    department: "People",
    location: "Mumbai",
    email: "nisha.iyer@gnxsolutions.com",
    joined: "04 Sep 2023",
    annualCtc: 1320000,
    payrollStatus: "Ready",
  },
  {
    id: "GNX-0064",
    name: "Kabir Bhatia",
    initials: "KB",
    role: "Finance Analyst",
    department: "Finance",
    location: "Gurugram",
    email: "kabir.bhatia@gnxsolutions.com",
    joined: "18 Jan 2024",
    annualCtc: 1160000,
    payrollStatus: "Review",
  },
  {
    id: "GNX-0071",
    name: "Meera Nair",
    initials: "MN",
    role: "Customer Success Lead",
    department: "Customer Success",
    location: "Pune",
    email: "meera.nair@gnxsolutions.com",
    joined: "08 Apr 2024",
    annualCtc: 1480000,
    payrollStatus: "Ready",
  },
  {
    id: "GNX-0086",
    name: "Rohan Kulkarni",
    initials: "RK",
    role: "Implementation Specialist",
    department: "Delivery",
    location: "Hyderabad",
    email: "rohan.kulkarni@gnxsolutions.com",
    joined: "21 Oct 2024",
    annualCtc: 980000,
    payrollStatus: "On hold",
  },
  {
    id: "GNX-0093",
    name: "Sanya Deshmukh",
    initials: "SD",
    role: "Product Designer",
    department: "Design",
    location: "Bengaluru",
    email: "sanya.deshmukh@gnxsolutions.com",
    joined: "03 Mar 2025",
    annualCtc: 1250000,
    payrollStatus: "Ready",
  },
];

export const formatInr = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const payrollRows = [
  { name: "Aarav Mehta", gross: 134200, deductions: 28410, net: 105790, status: "Ready" },
  { name: "Nisha Iyer", gross: 96800, deductions: 17860, net: 78940, status: "Ready" },
  { name: "Kabir Bhatia", gross: 84600, deductions: 15940, net: 68660, status: "Review" },
  { name: "Meera Nair", gross: 108500, deductions: 21450, net: 87050, status: "Ready" },
  { name: "Rohan Kulkarni", gross: 72100, deductions: 10940, net: 61160, status: "On hold" },
];
