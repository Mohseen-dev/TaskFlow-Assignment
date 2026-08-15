# TaskFlow

A simple full-stack task management board (Kanban-style) built for the TaskFlow take-home assignment.

**Live Demo:** Not deployed yet

**GitHub :** https://github.com/Mohseen-dev/TaskFlow-Assignment 

---

## 1. Overview

TaskFlow lets a small team manage tasks on a board with columns. 

Users can :-

- View a board with its columns and tasks
- Create a task
- Edit a task
- Delete a task
- Move a task between columns
- Filter tasks by priority
- Use the app on desktop and mobile (responsive layout)

### Tech Stack

**Frontend** — 
React, 
JavaScript, Vite, Tailwind CSS, React Icons, Fetch API

**Backend** — Node.js, Express.js, SQLite (`better-sqlite3`), CORS

### Folder Structure

```text
TaskFlow/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Board.jsx
│   │   │   ├── TaskModal.jsx
│   │   │   └── EditTaskModal.jsx
│   │   ├── services/
│   │   │   └── taskApi.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── boardController.js
│   │   │   └── taskController.js
│   │   ├── routes/
│   │   │   ├── boardRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── middleware/
│   │   │   ├── validateTask.js
│   │   │   └── errorHandler.js
│   │   ├── db/
│   │   │   ├── database.js
│   │   │   ├── schema.sql
│   │   ├── app.js
│   │   └── server.js
│   └── database.sqlite
│   └── seed.js
│   └── package.json
│
└── README.md
```

---

## 2. Setup & Run (from a fresh clone)

```bash
# 1. Clone the repository

git clone https://github.com/Mohseen-dev/TaskFlow-Assignment
cd TaskFlow

# 2. Backend — to install, set up the database, and start the server

cd backend
npm install
npm run setup      # creates the SQLite DB and adds seed data
npm run dev         # runs on http://localhost:9000
```

Open a **second terminal** for the frontend:

```bash
# 3. Frontend — to install and start the dev server

cd frontend
npm install
npm run dev         # runs on http://localhost:5173
```

Then open **http://localhost:5173** in your browser. 

Both servers need to stay running.

---

## 3. API Overview

Base URL: `http://localhost:9000/api`

### Board Endpoints

| Method | Endpoint                  | Purpose                          |
| ------ | -------------------------- | --------------------------------- |
| GET    | `/boards/:id`              | Get board with columns and tasks |
| GET    | `/boards/:id/task-counts`  | Get task count per column        |

### Task Endpoints

| Method | Endpoint                | Purpose                      |
| ------ | ------------------------ | ----------------------------- |
| GET    | `/tasks`                 | Get all tasks                |
| GET    | `/tasks/:id`              | Get one task                 |
| GET    | `/tasks?priority=High`   | Get tasks by priority        |
| POST   | `/tasks`                 | Create a task                |
| PUT    | `/tasks/:id`              | Update a task                 |
| PATCH  | `/tasks/:id/move`        | Move task to another column  |
| DELETE | `/tasks/:id`              | Delete a task                 |

On the frontend, all API calls are centralized in `frontend/src/services/taskApi.js`. The board UI lives in `Board.jsx`, with task creation/editing handled by `TaskModal.jsx` and `EditTaskModal.jsx`.

---

## 4. Assumptions

Where the assignment didn't specify exact behavior, I made these calls:

- One board only, with three fixed columns: To Do, In Progress, Done
- No authentication — single-user use case
- A task belongs to exactly one column at a time
- Priority is one of Low / Medium / High
- Moving a task changes its column; editing changes title, description, and priority
- SQLite was chosen for zero-setup local persistence (no separate DB server needed)
- Used a dropdown + control instead of drag-and-drop for moving tasks, to keep the implementation simple and reliable within the time budget

---

## 5. What I'd Improve With More Time

- Drag-and-drop task movement
- Task title search
- Clearer success/error toast notifications
- More backend test coverage
- More reusable frontend components
- UI polish/animations
- Production deployment config

I focused first on getting the required core functionality solid before anything else.

---

## 6. Development Time

Approximately **2–3 days**.

The development was mainly divided into:

- Database and backend setup
- REST API development
- Frontend integration
- CRUD functionality
- Task movement and priority filtering
- Responsive UI
- Final testing and cleanup

---

## Author

**Mohseen Khan**