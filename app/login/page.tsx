import { DemoSignIn } from "@/components/demo-sign-in";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-brand">
          <div className="brand-mark" aria-hidden="true">G</div>
          <span>Gnx Payroll</span>
        </div>

        <div className="login-content">
          <h1>Payroll work, kept clear.</h1>
          <p>Review the Gnx payroll workflow using an isolated HR test account and sample records.</p>
          <DemoSignIn />
        </div>

        <p className="login-footer">Demo environment. Authentication and all displayed records are for evaluation only.</p>
      </section>

      <section className="login-visual" aria-label="Product statement">
        <div className="login-statement">
          <h2>Every salary decision, traceable from input to payslip.</h2>
          <p>Built for the people, payroll, and finance teams responsible for getting every detail right.</p>
        </div>
      </section>
    </main>
  );
}
