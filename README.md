
# 💰 Currency Price Dashboard

A simple React + Express app to display real-time prices of currencies, gold, and cryptocurrencies using web scraping from [tgju.org](https://www.tgju.org).

## 🧠 Features

- Scrapes data (no manual price input)
- Real-time prices of:
  - Stock market
  - 18K gold
  - Gold ounce
  - Gold coin (mesghal)
  - USD
  - Bitcoin
  - Tether (IRT)
- Auto-refresh every 60 seconds
- Clean UI built with Tailwind CSS

## 🧰 Tech Stack

- Frontend: React (with Next.js), Tailwind CSS
- Backend: Express.js, Axios
- Scraping: Regex-based HTML parsing

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Ali-Alinejad/scraping.git
cd scraping
```

### 2. Backend Setup

```bash
npm install
node proxy-server.js
```

The proxy server will run at `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd game
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`.
### 4.intro
<p align="center">
  <img src="https://github.com/user-attachments/assets/d413376a-39ad-43b1-809c-743a0ba0da5d" width="500"/>
</p>

## 🔐 Notes

- Scraping is done on the server to bypass CORS and site protection.
- If tgju.org changes their DOM structure, you may need to update the regex selectors in the frontend.
