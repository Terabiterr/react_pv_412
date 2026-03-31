import express, { Request, Response } from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// --------------------
// Тип студента
// --------------------
interface Student extends RowDataPacket {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Age: number;
}

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
});

// --------------------
const app = express();
app.use(cors());
app.use(express.json());

// --------------------
// Тест підключення
// --------------------
async function testDB() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT 1");
    console.log("MySQL connected ✅", rows);
  } catch (err) {
    console.error("MySQL error ❌", err);
  }
}
testDB();

/*******************************************************************************************
 * GET ALL STUDENTS
 *******************************************************************************************/
app.get("/students", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<Student[]>("SELECT * FROM Students");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*******************************************************************************************
 * GET STUDENT BY ID
 *******************************************************************************************/
app.get("/students/:id", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<Student[]>(
      "SELECT * FROM Students WHERE Id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*******************************************************************************************
 * CREATE STUDENT
 *******************************************************************************************/
app.post("/students", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, age } = req.body;

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO Students (FirstName, LastName, Email, Age) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, age]
    );

    const [rows] = await pool.query<Student[]>(
      "SELECT * FROM Students WHERE Id = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*******************************************************************************************
 * UPDATE STUDENT
 *******************************************************************************************/
app.put("/students/:id", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, age } = req.body;

    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE Students 
       SET FirstName=?, LastName=?, Email=?, Age=? 
       WHERE Id=?`,
      [firstName, lastName, email, age, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const [rows] = await pool.query<Student[]>(
      "SELECT * FROM Students WHERE Id = ?",
      [req.params.id]
    );

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*******************************************************************************************
 * DELETE STUDENT
 *******************************************************************************************/
app.delete("/students/:id", async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM Students WHERE Id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------
// Запуск сервера
// --------------------
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});