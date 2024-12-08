const express = require("express");
const path = require("path");
const urlRoute = require("./router/url");
const URL = require("./models/url");
const staticRauter = require("./router/saticRauter");
const userRoute = require("./router/user");
const { restrictToLogedIn } = require("./middleware/auth");
const { connectToMongo } = require("./connection");
const cookieParser = require("cookie-parser");
const app = express();

connectToMongo("mongodb://localhost:27017/shorturl").then(() => {
  console.log("done");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLogedIn, urlRoute);
app.use("/", staticRauter);
app.use("/user", userRoute);

app
  .get("/url/:shortId", async (req, res) => {
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
  })
  .listen(8000);
