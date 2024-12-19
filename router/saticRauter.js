const express = require("express");
const URL = require("../models/url");
const { restrictionto } = require("../middleware/auth");

const router = express.Router();

router.get("/", restrictionto(["NORMAL"]), async (req, res) => {
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    URLS: allUrls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
