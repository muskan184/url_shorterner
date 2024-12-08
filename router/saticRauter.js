const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", (req, res) => {
  const allUrls = URL.find({});
  return res.render("home");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
