# Pre-Deploy Audit Report – B2B ERP Demo

**Date:** 2026-01-26  
**Scope:** Full codebase review for Vercel public demo deployment  
**Build:** `npm run build` ✓ (Next.js 14.2.15)

---

## 1. Critical issues (must fix before deploy)

**None remaining.** Addressed during audit:

- **Removed `console.error` in `components/Header.tsx`**  
  Role-switch failure was logged to console. Replaced with a silent catch (demo-only behaviour).

---

## 2. Medium issues (should fix)

**None remaining.** Addressed during audit:

- **Replaced `alert()` in Warehouse > Products “Save stock”**  
  “Save stock” previously used `alert('Demo mode – stock changes are disabled')`.  
  Now uses an inline yellow demo banner (same pattern as price/purchase/add-product) and closes the stock modal. No `alert()` left in app code.

---

## 3. Minor issues (nice to fix)

- **`toLocaleString('pl-PL')`**  
  Used for currency/date formatting in several places (e.g. orders, packing, customer dashboard, messages). For a strictly English UI, consider `toLocaleString('en-GB')` or `'en-US'` for consistency. Low priority if Polish locale is intentional for the demo.

- **Placeholder `email@example.com (optional)`**  
  In Accountant > New Customer. Audit requested no “example” in UI. Consider e.g. `your@email.com (optional)` or similar.

- **Demo credentials on login page**  
  Login screen shows “Username: demo” / “Password: demo123”. Acceptable for a demo but intentionally visible; ensure stakeholders are aware.

---

## 4. Confirmed OK areas

### Security & safety
- **No secrets, API keys, or credentials** in repo. No `.env` in app (only `.env*.local` gitignored).
- **No real auth** – demo login validates against `demo-data/users` only; no external IdP or DB.
- **No real email** – no SMTP or email API usage.
- **No real payments** – “payment method” is UI-only (dropdowns, labels); no Stripe/payment APIs.
- **No hardcoded production URLs or localhost** – `fetch` uses relative `/api/demo/...`.
- **`localStorage` usage**  
  - `lib/demoAuth`: all access guarded with `typeof window === 'undefined'` and used only in client code.  
  - Warehouse delivery-10days & packing: `localStorage` read in `useEffect`, write in handlers; both run only in browser. No SSR access.
- **`document` / `window`**  
  Used only in client components (`Modals`, `Header`, etc.) or behind `typeof window` checks. No SSR issues.
- **No `eval`, `dangerouslySetInnerHTML`, or unsafe DOM** in app source.

### Demo safety
- **Write-like actions are demo-only**  
  Save/Add/Update/Place order/etc. either show demo banners (“Demo mode – …”) or use disabled buttons with tooltips. No persistence.
- **No external API writes** – API routes only use in-memory demo data.
- **File input (Accountant > Messages)**  
  Attachments use `<input type="file">` for UI only. Submit shows “Demo mode – message not actually sent”. No upload to any backend.

### UI & language
- **UI copy in English** – Buttons, modals, labels, and main workflow text are English.
- **Warehouse actions** – “Ready to packing”, “Packed” (and “Packed ✓”) used as per requirements.
- **ERP terms** – Consistent use of order, packing, warehouse, etc.
- **No “lorem ipsum” or “test”** in UI.

### Next.js & App Router
- **`"use client"`** – Used where needed (layout auth checks, modals, tables, forms, etc.).
- **Layouts** – Accountant/Customer/Warehouse layouts use `useEffect` + `mounted` before auth checks; `isDemoAuthenticated` / `getDemoRole` run only client-side. No hydration issues observed.
- **Root layout** – RSC, `metadata` export, `lang="en"`. No deprecated Next APIs found.

### Build & deploy
- **`npm run build`** completes successfully.
- **ESLint** – No errors; one previous `useEffect` dependency warning in `customer/messages` was fixed.
- **No `console.log` / `console.warn`** in app code (after `console.error` removal).
- **Bundle size** – Reasonable for a demo (e.g. ~87 kB shared JS, page chunks in low single‑digit kB).
- **Vercel** – Standard Next.js 14 App Router; no custom server or experimental flags. Compatible with Vercel.

---

## 5. Final deploy recommendation

**READY TO DEPLOY**

- Critical and medium findings have been fixed.  
- Security, demo-only behaviour, and Next.js usage are in good shape.  
- Build is clean and suitable for public demo.

**Optional before first deploy:**
- Switch `toLocaleString('pl-PL')` to `en-GB`/`en-US` if you want all formatting in English.  
- Replace `email@example.com` placeholder if you prefer to avoid “example” in UI.

---

*Report generated as part of pre-deploy audit. Re-run `npm run build` and smoke-test key flows (login, role switch, warehouse actions, customer new order, accountant add order/messages) before going live.*
