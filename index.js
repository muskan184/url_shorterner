const express = require("express");
const urlRoute = require("./router/url");
const URL = require("./models/url");
const { connectToMongo } = require("./connection");
const app = express();

connectToMongo("mongodb://localhost:27017/shorturl").then(() => {
  console.log("done");
});
app.use(express.json());
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectId);
});
app.use("/url", urlRoute).listen(8000);
