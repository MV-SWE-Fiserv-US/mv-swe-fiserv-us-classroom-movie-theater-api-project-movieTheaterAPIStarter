const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { User, Show } = require("../models");

router.put(
  "/:id/shows/:showId",
  body("username").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.params.showId);
    await user.addShow(show);
    res.json({ message: "Show added to user" });
  }
);

module.exports = router;
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

router.get("/:id/shows", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const shows = await user.getShows();
  res.json(shows);
});

router.put("/:id/shows/:showId", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const show = await Show.findByPk(req.params.showId);
  await user.addShow(show);
  res.json({ message: "Show added to user" });
});

module.exports = router;
