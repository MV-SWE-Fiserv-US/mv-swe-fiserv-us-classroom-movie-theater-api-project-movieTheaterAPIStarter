const express = require("express");
const { User, Show } = require("../models");
const { Sequelize, Op } = require("sequelize");
// const { check, validationResult } = require("express-validator");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const shows = await Show.findAll();
    if (!shows) {
      const error = new Error("No shows found");
      error.status = 404;
      throw error;
    }
    res.json(shows);
  } catch (err) {
    next(err);
  }
});

router.get("/:id([0-9]+)", async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      const error = new Error("Show not found");
      error.status = 404;
      throw error;
    }
    res.json(show);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/users", async (req, res, next) => {
  // get users who have watched the show
  try {
    const show = await Show.findByPk(req.params.id, { include: User });
    if (!show) {
      const error = new Error("Show not found");
      error.status = 404;
      throw error;
    }
    res.json(show);
  } catch (err) {
    next(err);
  }
});

router.get("/:genre", async (req, res, next) => {
  try {
    const show = await Show.findAll({
      where: Sequelize.where(Sequelize.fn("lower", Sequelize.col("genre")), {
        [Op.like]: `%${req.params.genre}%`,
      }),
    });
    if (!show) {
      const error = new Error("Shows not found");
      error.status = 404;
      throw error;
    }
    res.json(show);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/available", async (req, res, next) => {
  // update the available property of a show
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      const error = new Error("Show not found");
      error.status = 404;
      throw error;
    }
    await show.update({ available: !show.available });
    res.json(show);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      const error = new Error("Show not found");
      error.status = 404;
      throw error;
    }
    await show.destroy();
    res.json(show);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
