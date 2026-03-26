import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

// --------------------
// Конфігурація MySQL
// --------------------
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "StudentDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// --------------------
// Ініціалізація Express
// --------------------
const app = express();
app.use(cors());
app.use(express.json());

// --------------------
// Тестове підключення
// --------------------
async function testDB() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("MySQL connected ✅", rows);
  } catch (err) {
    console.error("MySQL error ❌", err);
  }
}

testDB();

// --------------------
// Запуск сервера
// --------------------
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});