# 📚 Prompt Library Backend

A backend service to manage and organize prompts into different categories. Users can create, update, delete, and fetch prompts, enabling a structured and scalable prompt library system.

---

## 🚀 Features

- 📝 **Prompt Management** – Create, update, delete, and fetch prompts
- 🏷️ **Categorization** – Organize prompts into categories for easy discovery
- 👥 **Prompt Ownership** – Track which user created which prompt
- 📊 **Versioning & Metadata** – Store creation and last update timestamps
- ⚡ **Performance Optimizations** – Query optimization and efficient indexing
- 🧩 **Scalable Schema Design** – Clean, extensible schema using TypeORM

---

## 🛠️ Tech Stack

- **Node.js** – Backend runtime
- **TypeScript** – Type-safe development
- **TypeORM** – Database ORM for schema and queries
- **PostgreSQL** – Relational database
- **Express.js** – Web framework for APIs

---

## ⚙️ Setup Instructions (Using Yarn)

1. **Clone the repository and navigate to the folder**

```bash
1. git clone git@github.com:kuldeep-shr/prompt-library-backend.git
2. cd <repository_folder>
3. Configure environment variables
    3.1 PORT:<port number>
    3.2 DATABASE_URL:<enter your favourite name for database>
    3.3 JWT_SECRET:<your secret key, sshh.. dont tell to anyone>

4. Install dependencies use 'yarn install'
5. For Development server use 'yarn dev'
6. Build and start production server use 'yarn build' & 'yarn start'

```

---

## 🗂️ Schema Design

### 1. `users` Table

| Column     | Type     | Description                   |
| ---------- | -------- | ----------------------------- |
| id         | uuid     | Primary key                   |
| name       | string   | Name of the user              |
| email      | string   | Unique email                  |
| isActive   | boolean  | Status flag                   |
| created_at | datetime | Record creation timestamp     |
| updated_at | datetime | Record last updated timestamp |

---

### 2. `categories` Table

| Column      | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| id          | uuid     | Primary key                     |
| name        | string   | Category name (unique, indexed) |
| description | text     | Optional category description   |
| created_at  | datetime | Record creation timestamp       |
| updated_at  | datetime | Record last updated timestamp   |

---

### 3. `prompts` Table

| Column       | Type     | Description                   |
| ------------ | -------- | ----------------------------- |
| id           | uuid     | Primary key                   |
| title        | string   | Title of the prompt           |
| body         | text     | The full prompt content       |
| category     | string   | Category name                 |
| created_by   | uuid     | Foreign key → `users.id`      |
| last_updated | datetime | last updated prompt timestamp |

---

## 🌐 API Endpoints

All endpoints require **JWT authentication**.

### Prompts Endpoints

here id => Prompt Id

| Method | Endpoint                 | Description                             |
| ------ | ------------------------ | --------------------------------------- |
| GET    | `/api/prompts`           | Get all prompts (supports query filter) |
| GET    | `/api/prompts/:id`       | Get prompt by ID                        |
| POST   | `/api/prompts`           | Create a new prompt                     |
| PUT    | `/api/prompts/:id`       | Update prompt by ID                     |
| DELETE | `/api/prompts/:id`       | Delete prompt by ID                     |
| POST   | `/api/prompts/:id/clone` | Clone the prompt by ID                  |

**Query Parameters for GET `/api/prompts`:**

- `category` – Filter by category name (fuzzy match)
- `search` – Fuzzy search by prompt title

---

### Categories Endpoints

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| GET    | `/api/categories`     | Get all categories    |
| GET    | `/api/categories/:id` | Get category by ID    |
| POST   | `/api/categories`     | Create a new category |
| POST   | `/api/categories/:id` | Update category by ID |
| DELETE | `/api/categories/:id` | Delete category by ID |

---

## 🔍 Fuzzy Search

- Fuzzy search is **case-insensitive** and uses **substring matching**.
- Example: `/api/prompts?search=invoice` returns all prompts whose title contains `"invoice"` (ignoring case).
- `/api/prompts?category=legal` returns all prompts in categories containing `"legal"`.

---

## 🧙 Author

Made with ❤️ by **Kuldeep**

✨ "A powerful prompt isn’t long — it’s precise." 📝⚡

---

## 🙏 Acknowledgements

Inspired by [@a7urag](https://github.com/a7urag)'s excellent repository:

- ⭐️ [`node-express-mysql-typescript-api-boilerplate`](https://github.com/a7urag/node-express-mysql-typescript-api-boilerplate)
- Thank you for the clean architecture and TypeScript best practices.

## 🧙 Author

Made with ❤️ by Kuldeep

✨ "A powerful prompt isn’t long — it’s precise." 📝⚡
