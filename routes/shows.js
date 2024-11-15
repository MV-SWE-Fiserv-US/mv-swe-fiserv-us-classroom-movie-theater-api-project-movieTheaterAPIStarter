const express = require("express");
const { User, Show } = require("../models");
const { Sequelize, Op } = require("sequelize");
const { check, validationResult } = require("express-validator");
const { findAllOrFail, findModelOrFail } = require("../helpers");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const shows = await findAllOrFail(Show, "No shows found");
    res.json(shows);
  } catch (err) {
    next(err);
  }
});

router.get("/:id([0-9]+)", async (req, res, next) => {
  try {
    const show = await findModelOrFail(Show, req.params.id, "Show not found");
    res.json(show);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/users", async (req, res, next) => {
  // get users who have watched the show
  try {
    const show = await findModelOrFail(Show, req.params.id, "Show not found", {
      include: User,
    });
    res.json(show);
  } catch (err) {
    next(err);
  }
});

router.get("/:genre", async (req, res, next) => {
  try {
    const show = await findAllOrFail(Show, "Shows not found", {
      where: Sequelize.where(Sequelize.fn("lower", Sequelize.col("genre")), {
        [Op.like]: `%${req.params.genre}%`,
      }),
    });
    res.json(show);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  [
    check("title").notEmpty().trim().isLength({ max: 25 }),
    check("genre").notEmpty().trim(),
    check("available").isBoolean(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
      } else {
        const newShow = await Show.create(req.body);
        res.json(newShow);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.put("/:id/available", async (req, res, next) => {
  // update the available property of a show
  try {
    const show = await findModelOrFail(Show, req.params.id, "Show not found");
    await show.update({ available: !show.available });
    res.json(show);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const show = await findModelOrFail(Show, req.params.id, "Show not found");
    await show.destroy();
    res.json(show);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
