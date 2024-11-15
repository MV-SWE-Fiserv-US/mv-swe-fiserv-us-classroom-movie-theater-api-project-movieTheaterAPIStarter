const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const { User, Show } = require("../models");
const { findAllOrFail, findModelOrFail } = require("../helpers");

router.get("/", async (req, res, next) => {
  try {
    const users = await findAllOrFail(User, "No users found");
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await findModelOrFail(User, req.params.id, "User not found");
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/shows", async (req, res, next) => {
  // get one user and all shows watched
  try {
    const user = await findModelOrFail(User, req.params.id, "User not found", {
      include: Show,
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  [
    check("username").notEmpty().isEmail().trim(),
    check("password").notEmpty().trim(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
      } else {
        const newUser = await User.create(req.body);
        res.json(newUser);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.put("/:id/shows/:showId", async (req, res, next) => {
  // associate a user with a show they have watched
  const { id, showId } = req.params;
  try {
    const user = await findModelOrFail(User, id, "User not found");
    const show = await findModelOrFail(Show, showId, "Show not found");
    await user.addShow(show);
    await user.reload({ include: Show });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await findModelOrFail(User, req.params.id, "User not found");
    await user.destroy();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
