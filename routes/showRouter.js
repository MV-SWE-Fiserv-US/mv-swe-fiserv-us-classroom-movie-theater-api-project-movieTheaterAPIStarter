const express = require("express");
const router = express.Router();
const { Show, User } = require("../models");

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

router.put("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  show.available = req.body.available;
  await show.save();
  res.json(show);
});

router.delete("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  await show.destroy();
  res.json({ message: "Show deleted" });
});

router.get("/genre/:genre", async (req, res) => {
  const shows = await Show.findAll({
    where: { genre: req.params.genre },
  });
  res.json(shows);
});

module.exports = router;
