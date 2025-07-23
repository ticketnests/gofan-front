````markdown
# Ticketnest

**Ticketnest** is a user-friendly ticketing platform tailored for schools, charities, and organizations seeking seamless event management—from ticket sales and accounting to on-site check-in and payment processing.

---

## 🚀 Key Features

- **Flexible Ticket Sales**
  - Support for free, donation-based, and paid tickets for high school events, fundraisers, games, concerts, and more.
  - Multiple ticket types (e.g. VIP, General, Group) with custom pricing, descriptions, metadata fields.

- **Accounting & Cancellations**
  - Built-in revenue tracking and accounting tools.
  - Manage refunds, holds, and cancellations easily.

- **Scannable e‑Tickets & Check-In**
  - Automated QR code ticket generation and email delivery.
  - Mobile-friendly ticket scanning—no additional hardware required.

- **Payments & On-Site Sales**
  - Online payments via major processors.
  - On-site Tap‑to‑Pay and door sales through mobile devices.

- **Donations & Fundraising**
  - Sell tickets with built-in donation options for event-driven fundraisers.
  - Keep 100% of the proceeds—no hidden platform fees.

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
````

2. **Backend Setup**

   ```bash
   cd gofan-back
   npm install
   cp .env.example .env
   # Configure database, payment API keys, etc.
   npm run migrate
   npm start
   ```

3. **Frontend Setup**

   ```bash
   cd gofan-front
   npm install
   cp .env.example .env
   # Point REACT_APP_API_URL to your backend server
   npm start
   ```

4. Visit `http://localhost:3000`, create an event, and start selling or scanning tickets instantly!

---

## 💡 How It Works

| Step                         | Description                                                                |
| ---------------------------- | -------------------------------------------------------------------------- |
| 1️⃣ Create Event             | Admin defines ticket types, pricing, limits, and optional donation fields. |
| 2️⃣ Share Link or QR Code    | Embed ticket form on your site or use a ticketnest.us link or QR code.     |
| 3️⃣ Purchases & Tickets Sent | Buyers complete form → instant email with QR-coded tickets.                |
| 4️⃣ Event Day Check-In       | Use your phone or tablet to scan tickets at doors.                         |
| 5️⃣ Payout & Reporting       | View dashboard data or export. Receive payments weekly or on-demand.       |

---

## 🧩 Integrations / Plugins

* Payment gateways: Stripe, PayPal, Apple/Google Pay (if supported)
* Email services: Mailgun, SendGrid for ticket delivery
* CRM/Accounting: CSV/API export for external tools

---

## 🧪 Contributing

Contributions welcome! Please fork, develop in descriptive branches, and submit PRs with clear change descriptions and tests.

---

## 📄 License

MIT License.

---

## 📞 Questions?

Reach out via GitHub Issues or contact support through Ticketnest.

---

