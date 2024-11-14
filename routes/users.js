const express = require("express");
// const { check, validationResult } = require("express-validator");
const router = express.Router();
const { User, Show } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (!users) {
      const error = new Error("No users found");
      error.status = 404;
      throw error;
    }
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/shows", async (req, res, next) => {
  // get one user and all shows watched
  try {
    const user = await User.findByPk(req.params.id, { include: Show });
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/shows/:showId", async (req, res, next) => {
  // associate a user with a show they have watched
  const { id, showId } = req.params;
  try {
    const user = await User.findByPk(id);
    const show = await Show.findByPk(showId);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    } else if (!show) {
      const error = new Error("Show not found");
      error.status = 404;
      throw error;
    }
    await user.addShow(show);
    await user.reload({ include: Show });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
