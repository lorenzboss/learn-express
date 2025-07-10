import express from "express";
import users from "../data/users.js";

const router = express.Router();

let data = users;

// GET /api/users
router.get("/", (req, res) => {
  res.json(data);
});

// POST /api/users
router.post("/", (req, res) => {
  data.push(req.body);
  res.json(req.body);
});

// DELETE /api/users/:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (isNaN(id) || id > data.length - 1) {
    res.status(400);
    res.json({ error: "Invalid ID!" });
  }

  const deletedRecord = data[id];

  data.splice(id, 1);
  res.json({
    deletedRecord,
    newDataset: data,
  });
});

export default router;
