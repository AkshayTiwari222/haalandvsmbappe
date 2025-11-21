require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ADMIN_KEY = process.env.ADMIN_KEY;

// Home page
app.get("/", (req, res) => {
  db.get("SELECT * FROM stats WHERE id=1", (err, stats) => {
    res.render("index", { stats });
  });
});

// Admin page
app.get("/admin", (req, res) => {
  if (req.query.key !== ADMIN_KEY)
    return res.status(401).send("Unauthorized – add ?key=YOUR_PASSWORD");

  db.get("SELECT * FROM stats WHERE id=1", (err, stats) => {
    res.render("admin", { stats, key: ADMIN_KEY });
  });
});

// Save updates
app.post("/admin/save", (req, res) => {
  if (req.body.key !== ADMIN_KEY)
    return res.status(401).send("Unauthorized");

  const {
    haaland_goals,
    haaland_assists,
    haaland_apps,
    mbappe_goals,
    mbappe_assists,
    mbappe_apps
  } = req.body;

  db.run(`
    UPDATE stats SET 
      haaland_goals=?, 
      haaland_assists=?, 
      haaland_apps=?,
      mbappe_goals=?,
      mbappe_assists=?,
      mbappe_apps=?
    WHERE id=1
  `,
  [
    haaland_goals,
    haaland_assists,
    haaland_apps,
    mbappe_goals,
    mbappe_assists,
    mbappe_apps
  ],
  () => {
    res.redirect("/admin?key=" + ADMIN_KEY);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✔ Server running at http://localhost:${PORT}`)
);
