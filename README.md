# Ticketnest

**Ticketnest** is a user-friendly ticketing platform tailored for schools, charities, and organizations seeking seamless event management—from ticket sales and accounting to on-site check-in and payment processing.

---

## 🚀 Key Features

- **Flexible Ticket Sales**
  - Support for free, donation-based, and paid tickets for high school events, fundraisers, games, concerts, and more :contentReference[oaicite:1]{index=1}.
  - Multiple ticket types (e.g. VIP, General, Group) with custom pricing, descriptions, metadata fields.

- **Accounting & Cancellations**
  - Built-in revenue tracking and accounting tools.
  - Manage refunds, holds, and cancellations easily :contentReference[oaicite:2]{index=2}.

- **Scannable e‑Tickets & Check-In**
  - Automated QR code ticket generation and email delivery.
  - Mobile-friendly ticket scanning—no additional hardware required :contentReference[oaicite:3]{index=3}.

- **Payments & On-Site Sales**
  - Online payments via major processors.
  - On-site Tap‑to‑Pay and door sales through mobile devices :contentReference[oaicite:4]{index=4}.

- **Donations & Fundraising**
  - Sell tickets with built-in donation options for event-driven fundraisers.
  - Keep 100% of the proceeds—no hidden platform fees :contentReference[oaicite:5]{index=5}.

- **Event Management & Reporting**
  - Dashboard with real-time ticket sales, attendee lists, and scan analytics.
  - Exportable data for accounting or CRM tools.

---

## 📁 Repository Structure

### 🎨 Frontend (React)
- **[ticketnests/gofan‑front](https://github.com/ticketnests/gofan-front)** – React-based front-end interface for event browsing, ticket purchasing, and check-in workflows.
- Legacy v1 front-end (plain JavaScript) remains available in the repo history.

### 🛠 Backend (Node.js / Express)
- **[ticketnests/gofan‑back](https://github.com/ticketnests/gofan-back)** – RESTful API and server logic for ticket management, payments, user authentication, and reporting.

---

## 📦 Getting Started

1. **Clone the repos**
   ```bash
   git clone https://github.com/ticketnests/gofan-back.git
   git clone https://github.com/ticketnests/gofan-front.git


Backend Setup:
```bash
cd gofan-back
npm install
cp .env.example .env
# Configure database, payment API keys, etc.
npm run migrate
npm start
```

Frontend Setup:
```bash
cd gofan-front
npm install
cp .env.example .env
# Point REACT_APP_API_URL to your backend server
npm start
```
