# SpringEcom — Full-Stack E-Commerce Application

A full-stack e-commerce web application built with a **Spring Boot** REST API backend and a **React + Vite** frontend. It supports product management, image uploads, a shopping cart, order placement, and keyword-based product search.

---

## Tech Stack

| Layer     | Technology                                              |
|-----------|---------------------------------------------------------|
| Backend   | Java 25, Spring Boot 4.0.3, Spring Data JPA, Spring MVC |
| Database  | PostgreSQL                                              |
| ORM       | Hibernate (via JPA) + Lombok                            |
| Frontend  | React 18, Vite, React Router v6, Bootstrap 5            |
| HTTP      | Axios                                                   |
| UI extras | React-Toastify, React-Bootstrap, Bootstrap Icons        |

---

## Project Structure

```
Spring Project/
├── SpringEcom/          # Spring Boot backend
│   └── src/
│       └── main/java/com/rivu/SpringEcom/
│           ├── controller/       # REST controllers
│           ├── model/            # JPA entities & DTOs
│           ├── repo/             # Spring Data repositories
│           └── service/          # Business logic
└── t-ecom/              # React frontend
    └── src/
        ├── components/           # UI components
        ├── Context/              # Global state (React Context)
        └── App.jsx               # Routes & app shell
```

---

## Features

- **Product Catalog** — Browse all products with images, prices, brand, category, and stock info
- **Product Search** — Keyword-based search across the catalog
- **Product Management** — Add, update, and delete products with image upload support (up to 10 MB)
- **Shopping Cart** — Add/remove items, adjust quantities, and view totals via React Context
- **Order Placement** — Checkout with customer name and email; generates a unique order ID and deducts stock
- **Order History** — View all placed orders with itemized details
- **AI Chat** — Built-in AI assistant component (`AskAI`) for product queries

---

## Getting Started

### Prerequisites

- Java 25
- Maven
- Node.js ≥ 18 and npm
- PostgreSQL

### Backend Setup

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE spring_ecom;
   ```

2. Update `src/main/resources/application.properties` with your credentials:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5433/spring_ecom
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. Run the backend:
   ```bash
   cd SpringEcom/SpringEcom
   ./mvnw spring-boot:run
   ```

   The API will start at `http://localhost:8080`.

### Frontend Setup

1. Install dependencies:
   ```bash
   cd t-ecom
   npm install
   ```

2. The `.env` file is pre-configured to point to the backend:
   ```env
   VITE_BASE_URL="http://localhost:8080"
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

---

## API Endpoints

### Products — `/api`

| Method   | Endpoint                    | Description                    |
|----------|-----------------------------|--------------------------------|
| `GET`    | `/products`                 | Get all products               |
| `GET`    | `/product/{id}`             | Get product by ID              |
| `GET`    | `/product/{id}/image`       | Get product image bytes        |
| `GET`    | `/products/search?keyword=` | Search products by keyword     |
| `POST`   | `/product`                  | Add a new product (multipart)  |
| `PUT`    | `/product/{id}`             | Update a product (multipart)   |
| `DELETE` | `/product/{id}`             | Delete a product               |

### Orders — `/api`

| Method | Endpoint        | Description          |
|--------|-----------------|----------------------|
| `POST` | `/orders/place` | Place a new order    |
| `GET`  | `/orders`       | Get all orders       |

---

## Environment Notes

- **CORS** is enabled globally on all controllers (`@CrossOrigin`).
- **Hibernate DDL** is set to `update` — tables are created/updated automatically on startup.
- **File upload limits**: 10 MB per file, 15 MB per request (configurable in `application.properties`).
- Keep `application.properties` out of version control in production — it currently contains plaintext credentials.
