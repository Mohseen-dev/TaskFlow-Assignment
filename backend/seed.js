import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log("__filename :- " + __filename);
// console.log("__dirname :- " + __dirname);

const dbPath = path.join(__dirname, "database.sqlite");
console.log("db path : ", dbPath);

const schemaPath = path.join(__dirname, "src", "db", "schema.sql");
console.log("schema path : ", schemaPath);

console.log("Setting up TaskFlow database...");

const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

// Create tables
const schema = fs.readFileSync(schemaPath, "utf8");

db.exec(schema);

console.log("✓ Database tables created");

// Check if seed data already exists
const boardCount = db.prepare("SELECT COUNT(*) AS count FROM boards").get();

if (boardCount.count === 0) {
  const board = db
    .prepare(
      `
            INSERT INTO boards (name)
            VALUES (?)
        `,
    )
    .run("My Task Board");

  const boardId = board.lastInsertRowid;

  const createColumn = db.prepare(`
        INSERT INTO columns (board_id, name)
        VALUES (?, ?)
    `);

  const todo = createColumn.run(boardId, "To Do");
  const progress = createColumn.run(boardId, "In Progress");
  const done = createColumn.run(boardId, "Done");

  const createTask = db.prepare(`
        INSERT INTO tasks
        (column_id, title, description, priority)
        VALUES (?, ?, ?, ?)
    `);

  createTask.run(
    todo.lastInsertRowid,
    "Learn SQL",
    "Learn SQLite basics",
    "High",
  );

  createTask.run(
    todo.lastInsertRowid,
    "Build React UI",
    "Create TaskFlow frontend",
    "Medium",
  );

  createTask.run(
    progress.lastInsertRowid,
    "Build REST API",
    "Create Express endpoints",
    "High",
  );

  createTask.run(
    done.lastInsertRowid,
    "Design Database",
    "Create relational database",
    "Low",
  );

  console.log("✓ Seed data inserted");
} else {
  console.log("✓ Existing data found — seed skipped");
}

db.close();

console.log("✓ TaskFlow setup complete");
