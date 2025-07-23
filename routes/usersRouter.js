import express from "express";
import seed from "../data/users.js";
import { executeQuery } from "../db.js";

const router = express.Router();

// GET /api/users
router.get("/", async (req, res) => {
  const rows = await executeQuery("SELECT * FROM users ORDER BY id");

  res.json(rows);
});

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  const user = await executeQuery("Select * from users where id = $1", [
    req.params.id,
  ]);
  res.json(user[0]);
});

// POST /api/users
router.post("/", async (req, res) => {
  const rows = await executeQuery(
    "INSERT INTO users (firstname, lastname, address, age, email) VALUES ($1, $2, $3, $4, $5)",
    [
      req.body.firstname,
      req.body.lastname,
      req.body.address,
      req.body.age,
      req.body.email,
    ]
  );

  res.json(rows);
});

// PUT /api/users/:id
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    res.status(400);
    res.json({ error: "Invalid ID!" });
    return;
  }

  const oldUser = await executeQuery("SELECT * FROM users where id = $1", [id]);

  if (oldUser.length == 0) {
    res.status(400);
    res.json({ error: "This id does not exist!" });
  }

  await executeQuery(
    "UPDATE users SET firstname = $1, lastname = $2, address = $3, age = $4, email = $5 WHERE id = $6",
    [
      req.body.firstname,
      req.body.lastname,
      req.body.address,
      req.body.age,
      req.body.email,
      id,
    ]
  );

  const newUser = await executeQuery("SELECT * FROM users where id = $1", [id]);

  res.json({ oldUser, newUser });
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    res.status(400);
    res.json({ error: "Invalid ID!" });
  }

  const deletedRecord = await executeQuery(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );

  await executeQuery("DELETE FROM users WHERE id = $1", [id]);
  res.json({
    deletedRecord,
  });
});

// POST /api/users/seed
router.post("/seed", async (req, res) => {
  for (const user of seed) {
    await executeQuery(
      "INSERT INTO users (firstname, lastname, address, age, email) VALUES ($1, $2, $3, $4, $5)",
      [user.firstname, user.lastname, user.address, user.age, user.email]
    );
  }
  res.json(seed);
});

export default router;
