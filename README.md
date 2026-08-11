# Gnx Payroll

A modern internal payroll workspace for Gnx Solutions. This first iteration is a functional frontend prototype built to validate the HR and payroll flow before the Python backend is connected.

## Included flows

- Protected HR demo sign-in and eight-hour test session
- Payroll overview and period progress
- Employee search and filtering
- Employee onboarding dialog
- Payroll calculation and validation review
- Increment proposal approvals
- Payroll document search and email queue interactions
- Organisation, identity, and email integration settings
- Responsive navigation, loading, empty, error, and not-found states

All employee and payroll values currently displayed are sample data.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and use the test account:

```text
Email: hr.demo@gnxsolutions.com
Password: GnxDemo@2026
```

The credentials are intentionally public and must never be reused outside this sample application. All displayed records are fictional.

## Local environment

Copy `.env.example` to `.env.local` and generate a session signing secret:

```bash
cp .env.example .env.local
openssl rand -base64 32
```

Paste the generated value into `DEMO_SESSION_SECRET`.

## Verification

```bash
npm run lint
npm run build
```

## Deploy the current demo to Vercel

The present application only needs Vercel. Render and Supabase are not required until the Django backend is implemented.

1. Push this repository to GitHub.
2. Sign in to Vercel and select **Add New > Project**.
3. Import `arjunyash2/payroll_system`.
4. Keep the detected framework as **Next.js** and the root directory as `./`.
5. Add `DEMO_SESSION_SECRET` under **Environment Variables**. Use a new value from `openssl rand -base64 32`.
6. Add `NEXT_PUBLIC_APP_URL` with the Vercel production URL after the first deployment.
7. Select **Deploy**.
8. Verify `/login`, sign in with the HR test account, and test sign-out in the production deployment.

Every push to `main` will create a new Vercel production deployment after the Git integration is connected.

## Add Supabase when the backend begins

1. Create a Supabase project in Mumbai or Singapore.
2. Copy the session-pooler PostgreSQL connection string from **Connect**.
3. Create private Storage buckets named `payslips`, `tax-certificates`, and `salary-certificates`.
4. Keep all bucket access private. The Django API will generate short-lived signed download links.
5. Add database backups before importing real employee information.

Do not expose the database password or Supabase service-role key to the Next.js frontend.

## Add Render after the Django API exists

The planned backend will live under `backend/`. After that code is added:

1. Create a Render Web Service from the same GitHub repository.
2. Set the root directory to `backend` and choose the Singapore region.
3. Add the Supabase session-pooler URL as `DATABASE_URL`.
4. Add `DJANGO_SECRET_KEY`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, and storage credentials.
5. Use the backend build command to install requirements and collect static files.
6. Run Django migrations as the pre-deploy command.
7. Start the service with Gunicorn.
8. Add the Render API URL to Vercel as `NEXT_PUBLIC_API_URL` and redeploy the frontend.

Exact Render commands will be committed with the Django backend so the deployment cannot drift from the code.

## Next implementation stage

The next stage is a Django and Django REST Framework backend with PostgreSQL, including employee records, compensation versions, payroll periods, approval history, and replaceable authentication identities.
