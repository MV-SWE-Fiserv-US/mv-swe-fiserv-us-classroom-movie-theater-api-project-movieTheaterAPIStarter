const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("SHOW");
});

module.exports = router;
