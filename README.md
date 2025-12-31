# Next Commerce SaaS (Multi-Tenant Platform)

An open-source, multi-tenant e-commerce platform aimed at providing a Shopify-like experience. This project uses **Next.js Middleware** to handle dynamic subdomains, allowing every user to have their own distinct storefront URL (e.g., `brand.myplatform.com`).

![Status](https://img.shields.io/badge/Status-Active_Development-green) ![Migration](https://img.shields.io/badge/Migration-JS_to_TS-blue)

## 🚀 Key Features

* **Multi-Tenancy:** Single codebase serving thousands of distinct stores via subdomains.
* **Edge Middleware:** rewriting paths based on hostnames for high-performance routing.
* **Merchant Dashboard:** Centralized admin panel for product management, analytics, and orders.
* **Custom Storefronts:** Dynamic UI generation based on merchant settings.
* **Authentication:** Secure login for both platform admins and store customers.

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **State Management:** React Context / Zustand
* **Language:** JavaScript (Currently migrating to TypeScript 100%)

## 🏗️ Architecture: How Subdomains Work

This project relies heavily on `middleware.js` to route requests.

1.  **Request Inbound:** User visits `store-one.platform.com`.
2.  **Middleware Intercept:** The middleware detects the hostname.
3.  **Rewrite:** The URL is rewritten internally to `/site/store-one`.
4.  **Render:** Next.js renders the dynamic page specific to that tenant's data.

## 🚧 Roadmap & Current Focus

I am currently refactoring the codebase to ensure scalability and type safety.

- [ ] **Migrate entire codebase from JavaScript to TypeScript.**
- [ ] Implement advanced analytics for merchants.
- [ ] Optimize image loading with Next/Image for dynamic sources.
- [ ] Add support for custom domains (CNAME flattening).

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
