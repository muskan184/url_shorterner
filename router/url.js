const express = require("express");
const {
  handleGeneratedNewShortUrl,
  handleGetAnalytics,
} = require("../controller/url");

const router = express.Router();

router.post("/", handleGeneratedNewShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
