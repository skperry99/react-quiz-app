# Chalkboard Quiz 🧪🧽

A cozy, school-themed quiz app with a chalkboard aesthetic.

The frontend is built with **React + Vite**, and the backend is a **Spring Boot + MySQL** API that serves quiz questions from a database. Each run gives you **10 random questions**, shuffles the answer options, and shows **playful, weighted feedback** for right and wrong answers. There’s also a simple, token-protected **admin view** for managing the question bank.

---

## Features

### Quiz experience

- 10 **random questions** per playthrough, drawn from the full question bank
- Multiple-choice questions with **shuffled answer options**
- Instant “correct / incorrect” marking with color-coded buttons
- **Weighted random feedback**:
  - Fun phrases for correct answers (e.g. _“Bingo!”_, _“You’re on fire!”_)
  - Gentle, humorous nudges for incorrect answers
- Shows the **correct answer** after each question
- Running **score** and simple results summary screen
- Fallback to a **local seed question set** if the backend is unavailable

### Backend & admin

- REST API powered by **Spring Boot**
- **MySQL** database for questions and options
- Question model supports:
  - Text
  - Difficulty (e.g. EASY / MEDIUM / HARD)
  - Category
  - 4 options with one marked as `isCorrect`
- Simple admin tooling:
  - **Admin page** in the frontend to create/update/delete questions
  - **Token-protected** admin endpoints using an `X-Admin-Token` header
- CORS configured for local development (`http://localhost:5173` → `http://localhost:8080`)

### Developer experience

- Vite dev server for fast frontend iteration
- ESLint + Prettier configured
- Husky + lint-staged for pre-commit checks:
  - Auto-format JS/JSX, CSS, JSON, Markdown
  - Run ESLint on staged JS/JSX files

---

## Tech Stack

**Frontend**

- React
- Vite
- CSS (chalkboard theme + simple animations)

**Backend**

- Java 21
- Spring Boot
- Spring Web / Spring Data JPA
- MySQL
- HikariCP

**Tooling**

- Node.js & npm
- ESLint
- Prettier
- Husky & lint-staged

---

## Project Structure

```text
react-quiz-app/
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ index.css
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ Quiz.jsx
│  │  ├─ Question.jsx
│  │  ├─ Feedback.jsx
│  │  └─ Results.jsx
│  ├─ helpers/
│  │  ├─ quiz.js          # Local seed questions (used as fallback)
│  │  └─ feedback.js      # Weighted random feedback phrases
│  └─ config/
│     └─ api.js           # API_BASE_URL configuration
├─ quiz-backend/
│  ├─ src/main/java/com/example/quiz_backend/
│  │  ├─ QuizBackendApplication.java
│  │  ├─ controller/
│  │  │  └─ QuestionController.java
│  │  ├─ dto/
│  │  ├─ entity/
│  │  ├─ repository/
│  │  ├─ service/
│  │  └─ security/
│  │     └─ AdminTokenFilter.java
│  └─ src/main/resources/
│     └─ application.properties
├─ scripts/
│  ├─ quiz-to-sql.mjs     # (Optional) convert local quiz.js seed to SQL
│  └─ …                   # (Optional) bulk POST import script
├─ package.json
└─ README.md
````

> Note: folder layout may vary slightly depending on how you’ve organized the backend and scripts, but this is the general intent.

---

## Getting Started

### Prerequisites

* **Node.js** (v18+ recommended)
* **npm** (or yarn/pnpm)
* **Java 21+**
* **MySQL 8+**
* Git (optional but recommended)

---

## 1. Clone the repo

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd react-quiz-app
```

---

## 2. Backend Setup (Spring Boot + MySQL)

### 2.1. Create the database

In MySQL (Workbench or CLI), create a database:

```sql
CREATE DATABASE quiz_app
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

### 2.2. Configure Spring Boot

In `quiz-backend/src/main/resources/application.properties` (or `.yml`), configure your datasource:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/quiz_app?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=your_mysql_user
spring.datasource.password=your_mysql_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Optional: logging tweaks, etc.
```

> If you renamed the tables to avoid reserved words (e.g. `quiz_option` instead of `option`), the JPA entities should already be annotated accordingly.

### 2.3. Admin token configuration

In `application.properties`, add a token value:

```properties
admin.api.token=super-secret-admin-token
```

The `AdminTokenFilter` checks this token against the `X-Admin-Token` header for **non-GET** requests to `/api/questions`.

### 2.4. Run the backend

From the `quiz-backend` folder:

```bash
# using Maven wrapper if present
./mvnw spring-boot:run
# or on Windows
mvnw.cmd spring-boot:run

# or from IntelliJ: run QuizBackendApplication
```

By default, the API will be available at:

```text
http://localhost:8080
```

Key endpoint:

* `GET /api/questions` → returns the question list consumed by the React app

---

## 3. Frontend Setup (React + Vite)

From the project root (where `package.json` lives):

### 3.1. Install dependencies

```bash
npm install
```

### 3.2. Configure API base URL

In `src/config/api.js` (or similar):

```js
// src/config/api.js
export const API_BASE_URL = "http://localhost:8080";
```

If the backend is not running or returns an empty list, the quiz will fall back to the local `quizArray` from `src/helpers/quiz.js`.

### 3.3. Run the dev server

```bash
npm run dev
```

Vite will typically start on:

```text
http://localhost:5173
```

Open that in your browser to play the quiz.

---

## 4. Admin Question Management

There is a simple **admin view** (e.g. `/admin` route) that lets you:

* List existing questions
* Create new questions (text, difficulty, category)
* Add/edit the 4 options and mark which one is correct
* Delete questions

When making POST/PUT/DELETE requests to `/api/questions`, the frontend sends:

```http
X-Admin-Token: <your-token-here>
```

That token must match the `admin.api.token` value in your backend configuration.

> If you get **401 Unauthorized** or **405 Method Not Allowed**, double-check:
>
> * The backend is running
> * CORS is configured to allow `http://localhost:5173`
> * The `X-Admin-Token` header matches `admin.api.token`

---

## 5. Question Selection Logic

Each quiz run behaves as follows:

1. On load, the app tries to fetch questions from `GET /api/questions`.
2. If that fails, it falls back to the local `quizArray` defined in `src/helpers/quiz.js`.
3. From the full pool, it:

   * Shuffles the questions
   * Picks up to **10** questions for the current run
   * Shuffles the `options` array inside each question
4. On **Restart**, it:

   * Picks a **new random set of up to 10 questions** from the full pool
   * Resets score, feedback, and state

---

## 6. Development Workflow

### Linting & formatting

From the project root:

```bash
# Run ESLint on the whole project
npm run lint

# Format everything with Prettier
npm run format

# Check formatting (no write)
npm run format:check
```

### Pre-commit hooks

Husky + lint-staged are configured so that when you commit:

* Staged JS/JSX files are formatted with Prettier and fixed with ESLint
* Staged CSS/MD/JSON files are formatted with Prettier

---

## 7. Future Improvements

Some ideas for later:

* Question categories + filters (e.g. “only geography”, “mixed science & math”)
* Timed mode with a countdown per question
* Per-session and lifetime stats (accuracy, categories you miss most)
* More polished admin UI with search, pagination, and bulk actions
* Authentication & user accounts (e.g. JWT or OAuth) instead of a simple admin token
* Deploy frontend and backend so others can play online

---

## License

*(Add your preferred license here, e.g. MIT.)*

