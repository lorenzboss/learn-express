import express from "express";
import usersRouter from "./routes/userRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
