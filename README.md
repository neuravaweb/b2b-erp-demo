# B2B ERP Portal - Demo Project

A standalone demo application for a B2B ERP-style portal built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Demo Authentication**: Simple login system using localStorage (no real authentication)
- **Role-Based Panels**: Three distinct panels for Customer, Accountant, and Warehouse roles
- **Role Switching**: Seamless switching between roles without logout
- **Production-Ready UI**: Professional, modern interface built with Tailwind CSS
- **Demo Data**: Realistic Polish/EU B2B style data (no lorem ipsum)

## Tech Stack

- Next.js 14.2.x (App Router)
- React 18
- TypeScript (strict mode)
- Tailwind CSS 3.4
- No external UI libraries
- System fonts (Arial/Helvetica)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Login Credentials

- **Username**: `demo`
- **Password**: `demo123`

After login, you'll be redirected to the Customer panel. Use the role switching buttons in the header to switch between panels.

## Project Structure

```
app/
 ├─ (auth)/
 │   └─ login/page.tsx          # Login page
 ├─ customer/                    # Customer panel
 ├─ accountant/                  # Accountant panel
 ├─ warehouse/                   # Warehouse panel
 └─ api/demo/                    # Demo API routes

components/                      # Shared UI components
demo-data/                       # Demo data files
lib/                            # Utility functions
styles/                         # Global styles
```

## Panels Overview

### Customer Panel
- Dashboard with order statistics
- New Order (with cart functionality)
- List of Orders
- Fabric Charts
- Announcements (read-only, PDF-like preview)
- Messages
- My Data
- Change Password (UI only, disabled)

### Accountant Panel
- Dashboard
- All Orders
- Products and States
- Add an Order
- Fabric Charts
- Messages
- Announcements
- New Customer (non-functional)
- New Customers from the fair (non-functional)
- Customers (3 dummy customers)
- Password Reset (1 dummy request)

### Warehouse Panel
- Warehouse Alerts
- Packing Orders
- Orders – Delivery up to 10 Days
- Defective for Verification (3 dummy products)
- Products and stock levels (edit/add modals with disabled inputs)

## Important Notes

- **This is a DEMO project only** - No real database, authentication, or backend logic
- All write actions are disabled (forms open but inputs are disabled)
- Data is stored in TypeScript files in `demo-data/` directory
- Authentication uses localStorage only (no cookies, no JWT)
- Role switching updates localStorage and redirects to the appropriate panel

## Build

```bash
npm run build
```

## License

This is a demo project for demonstration purposes only.
