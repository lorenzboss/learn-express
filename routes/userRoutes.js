import express from "express";
const router = express.Router();

// /api/users
router.get("/", (req, res) => {
  res.json({ hello: "This is the Hello Message" });
});

// /api/users/data

const secretValue = "VERY_SECRET_STRING";

router.post("/data", (req, res) => {
  let randomArray = Array.from({ length: 10 });
  randomArray = randomArray.map((number) => {
    return Math.floor(Math.random() * 100);
  });

  console.log(req.body);
  res.json({
    receivedData: req.body,
    secretValue,
    time: new Date().toLocaleString("DE"),
    signature: randomArray.toLocaleString(),
  });
});

export default router;
