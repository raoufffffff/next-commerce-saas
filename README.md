# 🛒 Next Commerce SaaS

**A High-Performance, Multi-Tenant E-Commerce Platform built with Next.js 15 & TypeScript.**

![Project Status](https://img.shields.io/badge/Status-Active_Development-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)

## 📖 Overview

Next Commerce is a white-label SaaS platform that allows merchants to create their own online stores instantly. It utilizes **Middleware-based Subdomain Routing** to serve distinct stores from a single codebase (e.g., `store1.example.com`, `store2.example.com`).

Recently migrated to **Strict TypeScript** for maximum reliability and type safety.

## ✨ Key Features

* **🌐 Multi-Tenancy:** Dynamic subdomain routing using Next.js Middleware.
* **⚡ Extreme Performance:** Uses `force-static` and aggressive caching strategies for near-instant page loads.
* **🛒 COD Optimized Checkout:** Custom checkout forms tailored for Cash On Delivery markets (Algeria/North Africa).
* **📊 Analytics Integration:** Native support for **Facebook Pixel**, **TikTok Pixel**, and **Microsoft Clarity**.
* **📱 Mobile First:** Sticky "Buy Now" buttons and touch-optimized galleries.
* **🛡️ Type Safety:** Fully typed codebase with shared interfaces for Stores, Products, and APIs.
* **🎨 Dynamic Theming:** Stores inject their own colors, logos, and branding automatically.

## 🛠️ Tech Stack

* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Image Handling:** React Photo View & Next/Image optimization
* **Deployment:** Vercel (Recommended)

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* npm or pnpm

## 📦 Getting Started

*(Note: Ensure you have your environment variables set up for the database)*

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/next-commerce-saas.git](https://github.com/your-username/next-commerce-saas.git)
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Test Subdomains:**
    Update your `/etc/hosts` file to test subdomains locally (e.g., `127.0.0.1 test.localhost`).

## 🤝 Contributing

We are currently in a heavy development phase focusing on the TypeScript migration. PRs improving typing coverage are welcome!

---

*Built with ❤️ by abderraouf hamoudi*