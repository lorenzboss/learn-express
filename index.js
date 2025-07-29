import express from "express";
import testRouter from "./routes/testRouter.js";
import todoRouter from "./routes/todoRouter.js";
import usersRouter from "./routes/usersRouter.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

app.use("/api/test", testRouter);
app.use("/api/users", usersRouter);
app.use("/api/todo", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
