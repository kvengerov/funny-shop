# 🛒 Shop Project

A premium e-commerce application built with **Angular 21** and **Tailwind CSS 4**, following the **Feature-Sliced Design (FSD)** architectural methodology.

---

## 🏗 Architecture: Feature-Sliced Design (FSD)

This project follows **Feature-Sliced Design**, a modern architectural methodology for frontend applications. It helps keep the codebase scalable, maintainable, and easy to understand.

### 🍰 Layers Structure
- **`app/`**: Root of the application. Setup of providers, router, and global styles.
- **`pages/`**: Full pages of the application. Composition of widgets and features.
- **`widgets/`**: Large autonomous components that combine multiple features/entities (e.g., `ProductList`, `Navbar`).
- **`features/`**: User-facing actions that bring business value (e.g., `AddToCart`, `SearchProducts`). *(Coming soon)*
- **`entities/`**: Business entities (e.g., `Product`, `User`, `Order`). Contains models, logic, and simple UI components.
- **`shared/`**: Reusable infrastructure code. UI kit, API helpers, constants, and utilities.

---

## 🛠 Tech Stack
- **Framework:** [Angular 21](https://angular.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** TypeScript 5.9
- **Containerization:** Docker & Docker Compose
- **Web Server:** Nginx (Alpine)
- **Testing:** Vitest

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

### 💻 Local Development

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start application & mock server:**
    The easiest way to start everything is using Docker Compose:
    ```bash
    docker compose up --build
    ```
    - **Frontend:** `http://localhost:4200`
    - **Mock API:** `http://localhost:8080/api`

---

## 📂 Project Structure

```text
shop/
├── .docker/               # Docker & Nginx configuration
│   ├── Dockerfile.prod    # Production build
│   ├── Dockerfile.dev     # Development build
│   ├── Dockerfile.api     # API server build
│   └── nginx.conf         # Nginx server config
├── mock-server/           # Node.js mock API server
│   └── server.js          # API logic
├── src/
│   ├── app/               # App initialization (routes, styles)
│   ├── pages/             # Route views
│   ├── widgets/           # Composition components
│   ├── entities/          # Business logic & models
│   ├── shared/            # Reusable components & utils
│   ├── main.ts            # Entry point
│   └── index.html         # HTML template
├── docker-compose.yml     # Dev environment orchestration
├── docker-compose.prod.yml # Production orchestration
└── angular.json           # Angular configuration
```

---

## 🛠 Mock Server

The project includes a mock server located in `/mock-server`. It provides realistic API responses for development and testing.

- **Port:** 8080
- **Base Path:** `/api`
- **Endpoints:** `/api/products`, `/api/products/:id`, etc.

---

### 📦 Production

To run the production-ready build with Nginx optimization:

1.  **Build and run:**

```bash
docker compose -f docker-compose.prod.yml up -d --build
    ```

    The application will be available at `http://localhost/`.

2.  **Stop the production container:**

    ```bash
    docker compose -f docker-compose.prod.yml down
    ```

## 🏗 Project Structure

- `src/` - Source code
- `Dockerfile` - Production Docker configuration (Multi-stage build)
- `Dockerfile.dev` - Development Docker configuration
- `docker-compose.yml` - Development orchestration
- `docker-compose.prod.yml` - Production orchestration
- `nginx.conf` - Nginx configuration for production

## 🧪 Testing

To run unit tests:

```bash
npm test
```
