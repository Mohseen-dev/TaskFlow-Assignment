import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log("__filename from actual database : ",__filename);
// console.log("__dirname from actual database : ",__dirname);

const dbPath = path.join(__dirname, "../../database.sqlite");
// console.log("dbpath from  db/database.js file :: ",dbPath);

const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

export {db};