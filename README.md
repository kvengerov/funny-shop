# Shop Project

A modern e-commerce application built with Angular and Docker.

## 🛠 Technologies Used

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

---

### 💻 Local Development (running on host)

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Start the development server:**

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:4200/`.

---

### 🐳 Docker Development

Run the application in a container with hot-reload enabled.

1.  **Start the container:**

    ```bash
    docker compose up --build
    ```

    The application will be available at `http://localhost:4200/`.

---

### 📦 Production Build (Docker)

Build and serve the optimized production version using Nginx.

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
