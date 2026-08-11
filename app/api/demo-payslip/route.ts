import { getDemoPayslip } from "@/lib/demo-payslips";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const runtime = "nodejs";

const inr = (value: number) => `INR ${new Intl.NumberFormat("en-IN").format(value)}`;

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("employee");
  const payslip = getDemoPayslip(slug);

  if (!payslip) {
    return Response.json({ error: "Employee payslip not found." }, { status: 404 });
  }

  if (payslip.status === "On hold") {
    return Response.json(
      { error: "This payslip is on hold until employee bank details are verified." },
      { status: 409 },
    );
  }

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const medium = await pdf.embedFont(StandardFonts.HelveticaBold);
  const width = page.getWidth();
  const navy = rgb(23 / 255, 32 / 255, 51 / 255);
  const muted = rgb(96 / 255, 107 / 255, 125 / 255);
  const line = rgb(227 / 255, 231 / 255, 238 / 255);
  const accent = rgb(49 / 255, 89 / 255, 199 / 255);
  const soft = rgb(248 / 255, 249 / 255, 251 / 255);
  const margin = 48;

  const text = (value: string, x: number, y: number, size = 9, bold = false, color = navy) => {
    page.drawText(value, { x, y, size, font: bold ? medium : regular, color });
  };
  const rightText = (value: string, right: number, y: number, size = 9, bold = false, color = navy) => {
    const font = bold ? medium : regular;
    page.drawText(value, { x: right - font.widthOfTextAtSize(value, size), y, size, font, color });
  };
  const rule = (y: number) => page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 1, color: line });

  page.drawRectangle({ x: 0, y: 0, width, height: page.getHeight(), color: rgb(1, 1, 1) });
  page.drawRectangle({ x: margin, y: 754, width: 38, height: 38, color: accent });
  text("GNX", margin + 7, 768, 12, true, rgb(1, 1, 1));
  text("Gnx Solutions Private Limited", margin + 50, 778, 14, true);
  text("Bengaluru, Karnataka, India", margin + 50, 761, 9, false, muted);
  rightText("PAYSLIP", width - margin, 778, 16, true, accent);
  rightText("August 2026", width - margin, 761, 10, false, muted);

  page.drawRectangle({ x: margin, y: 714, width: width - margin * 2, height: 23, color: rgb(237 / 255, 241 / 255, 255 / 255) });
  text("DEMO DOCUMENT  •  SAMPLE DATA FOR WORKFLOW REVIEW", margin + 12, 722, 8, true, accent);

  text("Employee details", margin, 683, 11, true);
  rule(674);
  const leftX = margin;
  const rightX = 315;
  const details = [
    ["Employee", payslip.name, "Employee ID", payslip.employeeId],
    ["Designation", payslip.role, "Department", payslip.department],
    ["Work location", payslip.location, "Pay date", "30 August 2026"],
    ["Bank account", payslip.bankAccount, "PAN / UAN", `${payslip.pan} / ${payslip.uan}`],
  ];
  details.forEach((row, index) => {
    const y = 650 - index * 36;
    text(row[0], leftX, y + 12, 7.5, true, muted);
    text(row[1], leftX, y - 1, 9, false);
    text(row[2], rightX, y + 12, 7.5, true, muted);
    text(row[3], rightX, y - 1, 9, false);
  });

  text("Salary statement", margin, 510, 11, true);
  rule(501);
  page.drawRectangle({ x: margin, y: 470, width: width - margin * 2, height: 30, color: soft });
  text("EARNINGS", margin + 12, 481, 8, true, muted);
  rightText("AMOUNT", 284, 481, 8, true, muted);
  text("DEDUCTIONS", 315, 481, 8, true, muted);
  rightText("AMOUNT", width - margin - 12, 481, 8, true, muted);

  payslip.earnings.forEach((earning, index) => {
    const y = 447 - index * 31;
    text(earning.label, margin + 12, y, 9);
    rightText(inr(earning.amount), 284, y, 9);
  });
  payslip.deductions.forEach((deduction, index) => {
    const y = 447 - index * 31;
    text(deduction.label, 315, y, 9);
    rightText(inr(deduction.amount), width - margin - 12, y, 9);
  });

  rule(345);
  text("Gross earnings", margin + 12, 327, 9, true);
  rightText(inr(payslip.gross), 284, 327, 9, true);
  text("Total deductions", 315, 327, 9, true);
  rightText(inr(payslip.totalDeductions), width - margin - 12, 327, 9, true);

  page.drawRectangle({ x: margin, y: 257, width: width - margin * 2, height: 52, color: navy });
  text("NET PAY", margin + 16, 285, 8, true, rgb(190 / 255, 198 / 255, 211 / 255));
  text("Amount credited to the employee bank account", margin + 16, 270, 8, false, rgb(190 / 255, 198 / 255, 211 / 255));
  rightText(inr(payslip.net), width - margin - 16, 275, 18, true, rgb(1, 1, 1));

  text("Notes", margin, 218, 9, true);
  text("This computer-generated demo payslip does not require a signature.", margin, 201, 8, false, muted);
  text("Figures are sample values and must not be used for statutory filing or payment.", margin, 188, 8, false, muted);
  rule(92);
  text("Gnx Payroll  •  Internal HR workspace", margin, 73, 8, false, muted);
  rightText(`Generated for ${payslip.email}`, width - margin, 73, 8, false, muted);

  const bytes = await pdf.save();
  const body = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${payslip.employeeId}-Payslip-Aug-2026.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
