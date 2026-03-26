const express = require("express");
const router = express.Router();
const { readData, writeData } = require("../services/studentsService");
 
// GET all
router.get("/", async (req, res) => {
  const students = await readData();
  res.json(students);
});
 
// GET by id
router.get("/:id", async (req, res) => {
  const students = await readData();
  const student = students.find(s => s.id === Number(req.params.id));
 
  if (!student) return res.status(404).json({ message: "Not found" });
 
  res.json(student);
});
 
// CREATE
router.post("/", async (req, res) => {
  const students = await readData();
 
  const newStudent = {
    id: Date.now(),
    ...req.body
  };
 
  students.push(newStudent);
  await writeData(students);
 
  res.status(201).json(newStudent);
});
 
// UPDATE
router.put("/:id", async (req, res) => {
  const students = await readData();
  const index = students.findIndex(s => s.id === Number(req.params.id));
 
  if (index === -1)
    return res.status(404).json({ message: "Not found" });
 
  students[index] = { id: Number(req.params.id), ...req.body };
 
  await writeData(students);
 
  res.json(students[index]);
});
 
// DELETE
router.delete("/:id", async (req, res) => {
  const students = await readData();
  const filtered = students.filter(s => s.id !== Number(req.params.id));
 
  await writeData(filtered);
 
  res.json({ message: "Deleted" });
});
 
module.exports = router;