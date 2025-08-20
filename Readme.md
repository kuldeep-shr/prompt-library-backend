# 📚 Prompt Library

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

## 🗂️ Schema Design

### 1. `users` Table  
Stores details of the users who create prompts.  

| Column       | Type      | Description                          |
|--------------|----------|--------------------------------------|
| id           | uuid     | Primary key                          |
| name         | string   | Name of the user                     |
| email        | string   | Unique email                         |
| isActive     | boolean  | Status flag                          |
| created_at   | datetime | Record creation timestamp            |
| updated_at   | datetime | Record last updated timestamp        |

---

### 2. `prompts` Table  
Stores all prompt-related details.  

| Column        | Type      | Description                          |
|---------------|----------|--------------------------------------|
| id            | uuid     | Primary key                          |
| title         | string   | Title of the prompt                  |
| body          | text     | The full prompt content              |
| category      | string   | Category name                        |
| created_by    | uuid     | Foreign key → `users.id`             |
| last_updated  | datetime | Last update timestamp                |
| created_at    | datetime | Record creation timestamp            |

---

⚡ This schema allows:  
- Easy categorization of prompts  
- Clear ownership tracking  
- Scalability for millions of records  


## 🙏 Acknowledgements (Before you go further, please read this)

This project was heavily inspired by the great structure and clarity of [@a7urag](https://github.com/a7urag)'s repository:

- ⭐️ [`node-express-mysql-typescript-api-boilerplate`](https://github.com/a7urag/node-express-mysql-typescript-api-boilerplate)

A huge thanks for setting such a great reference point for writing clean, scalable backend architecture using TypeScript, Express, and TypeORM.


## 🧙 Author

Made with ❤️ by Kuldeep

“A great URL doesn't need to be long — just smart.” 🔗✨
