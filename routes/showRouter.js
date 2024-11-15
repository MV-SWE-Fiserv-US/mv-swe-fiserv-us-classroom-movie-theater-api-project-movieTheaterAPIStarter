const express = require("express");
const { body, validationResult } = require("express-validator");
const { Show, User } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  const shows = await Show.findAll();
  res.json(shows);
});

router.get("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  res.json(show);
});

router.get("/:id/users", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  const users = await show.getUsers();
  res.json(users);
});

router.put(
  "/:id",
  body("title")
    .isLength({ max: 25 })
    .withMessage("Title must be 25 characters or less"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }
    show.title = req.body.title;
    show.available = req.body.available;
    await show.save();
    res.json(show);
  }
);

router.delete("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  if (!show) {
    return res.status(404).json({ message: "Show not found" });
  }
  await show.destroy();
  res.json({ message: "Show deleted" });
});

module.exports = router;
