# 🌟 Stellar Payment Dashboard (Claude UI Edition)

A beautifully minimalist, light-themed payment dashboard built on the Stellar blockchain. This repository completely abstracts away complex blockchain mechanics using the [Stellar Wallets Kit](https://github.com/Creit-Tech/Stellar-Wallets-Kit), while delivering a pristine, premium user experience heavily inspired by the aesthetic of **Claude Code**.

[![Live Demo](https://img.shields.io/badge/Live-Vercel-success)](https://stellar-challenge-frontend.vercel.app/)
[![Stellar Testnet](https://img.shields.io/badge/Network-Testnet-blue)](https://stellar.org)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com)

---

## 🎨 Design Philosophy & UI Features
This codebase has been thoroughly refactored away from standard Web3 "neon" designs into a premium editorial environment:
- **Typography:** Relies completely on Google’s `Fraunces` for rich, warm Serif headers, `Inter` for hyper-legible body text, and `JetBrains Mono` for cryptographic representations.
- **Color Architecture:** Deploys a distinctive "Warm Sand" backdrop (`#F3EFEC`) punctuated by absolute-minimalist white surface cards (`#FCFAF8`), structured by hairline thin borders and gentle terracotta accents (`#D97757`).
- **CSS Standardization:** Highly reusable `.claude-card`, `.claude-button`, and `.claude-input` variants built securely inside `globals.css` ensuring rapid prototyping without muddy tailwind syntax.

*(For an exhausting breakdown of our visual token constraints and grid logics, please reference `DESIGN.md`).*

---

## 📁 Project Directory Structure
The architecture completely segregates layout semantics, visual components, and core blockchain state logic.

```
stellar-frontend-challenge/
├── app/
│   ├── globals.css          # Design system primitives (.claude-card, base themes)
│   ├── layout.tsx           # Font ingestions (Fraunces/Inter) and Root wrapper
│   └── page.tsx             # The dashboard layout rendering the grid structure
│
├── components/
│   ├── Navbar.tsx             # Sticky minimalist header with connection controls
│   ├── WalletSection.tsx      # Active session tracking and wallet statuses
│   ├── BalanceDisplay.tsx     # Hero-metric net-worth component
│   ├── PaymentForm.tsx        # Validated interface for submitting XLM transfers
│   ├── TransactionHistory.tsx # Detailed, parsed history of network movements
│   └── example-components.tsx # Universal design system atoms (Buttons, Inputs, Alerts)
│
├── lib/
│   └── stellar-helper.ts    # ⚠️ CORE BLOCKCHAIN LOGIC (DO NOT MODIFY STRUCTURE)
│
├── public/                  # Static assets and typography licenses
├── DESIGN.md                # Detailed style guides and architectural tokens
└── README.md                # 👈 You are here
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js 18+**
- A compatible Stellar Wallet (e.g., [Freighter](https://freighter.app) - Highly Recommended)

### Setup Instructions

```bash
# 1. Clone your repository
git clone https://github.com/senapati484/stellar-frontend-challenge.git
cd stellar-frontend-challenge

# 2. Install package dependencies
npm install

# 3. Launch the local environment
npm run dev
```

The application runs natively on port 3000. Open [http://localhost:3000](http://localhost:3000) to view the localized design system. 

*(Note: If you make large edits to `tailwind.config.js`, you must reboot `npm run dev` to purge the Next.js module cache).*

---

## 💳 Testing on the Network 
The dashboard interacts directly with the **Stellar Testnet**. You must use test funds to avoid risking real capital!

1. Load your wallet and connect via the Dashboard.
2. Under "Address", hit the copy icon to pull your Public Key.
3. Traverse to the [Stellar Laboratory Friendbot](https://laboratory.stellar.org/#account-creator?network=test).
4. Drop your key into their generator to request 10,000 test XLM.
5. Watch your `BalanceDisplay.tsx` component automatically sync and display your new wealth!

---

## 🛠️ The Tech Engine (`stellar-helper.ts`)
The entire application draws its data purely from `lib/stellar-helper.ts`. All functions return standard promises utilizing strictly typed wrappers around the official `@stellar/stellar-sdk`:

```typescript
import { stellar } from '@/lib/stellar-helper';

// Core operations
const address = await stellar.connectWallet();
const { xlm, assets } = await stellar.getBalance(address);

// Execution
const result = await stellar.sendPayment({
  from: senderAddress,
  to: recipientAddress,
  amount: "10.5"
});

// Explorer look-back
const transactions = await stellar.getRecentTransactions(address, 10);
```

---

## 🤝 Contributing & Extension
This represents a comprehensive final standard for minimalistic Web3 design. If you wish to extend the UI (for instance, creating charting interfaces, integrating standard Soroban smart contracts, or building multiple asset bridges), please submit a Pull Request! 

**Built exclusively to prove that Web3 doesn't have to look like Web3.**

---

## 👤 Author
Developed and designed by **Sayan Senapati (senapati484)**. 

- **Live Site**: [stellar-challenge-frontend.vercel.app](https://stellar-challenge-frontend.vercel.app/)
- **Repository**: [senapati484/stellar-frontend-challenge](https://github.com/senapati484/stellar-frontend-challenge)
