import express from "express";
const router = express.Router();

// /api/test/body
router.get("/body", (req, res) => {
  res.json({
    receivedUser: req.body.userName,
    receivedAmount: req.body.amount,
  });
});

// /api/test/query?firstName=Aline&lastName=Boss
router.get("/query", (req, res) => {
  res.json({
    receivedFirstName: req.query.firstName,
    receivedLastName: req.query.lastName,
  });
});

// /api/test/params/8193/page2
router.get("/params/:id/:page", (req, res) => {
  res.json({
    receivedId: req.params.id,
    receivedPage: req.params.page,
  });
});

export default router;
