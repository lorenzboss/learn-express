import express from "express";
import testRouter from "./routes/testRouter.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

app.use("/api/test", testRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
