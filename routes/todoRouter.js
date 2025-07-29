import express from "express";
import { executeQuery } from "../db.js";

const router = express.Router();

// GET /api/todo
router.get("/", async (req, res) => {
  const rows = await executeQuery(
    "SELECT * FROM todo ORDER BY completed, date, id"
  );
  res.json(rows);
});

// GET /api/todo/:id
router.get("/:id", async (req, res) => {
  const todo = await executeQuery("SELECT * FROM todo WHERE id = $1", [
    req.params.id,
  ]);

  if (todo.length == 0) {
    res.status(400).json({ error: "This id not valid" });
    return;
  }
  res.json(todo[0]);
});

// POST /api/todo
router.post("/", async (req, res) => {
  await executeQuery("INSERT INTO todo (text, date) VALUES ($1, $2)", [
    req.body.text,
    req.body.date,
  ]);

  const newTodo = await executeQuery(
    "SELECT * FROM todo ORDER BY id DESC LIMIT 1"
  );

  res.json(newTodo[0]);
});

// POST /api/todo/done/:id
router.post("/done/:id", async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    res.status(400).json({ error: "This id not valid" });
    return;
  }

  const todo = await executeQuery("SELECT * FROM todo WHERE id = $1", [
    req.params.id,
  ]);

  if (todo.length === 0) {
    res.status(400).json({ error: "This id does not exist" });
    return;
  }

  let update;
  if (!todo[0].completed) {
    update = "Marked as completed!";
    await executeQuery("UPDATE todo SET completed = true where id = $1", [id]);
  } else {
    update = "Was already done!";
  }

  res.json({
    id: todo[0].id,
    text: todo[0].text,
    update,
  });
});
export default router;
