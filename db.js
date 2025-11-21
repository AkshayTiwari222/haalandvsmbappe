const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./stats.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY CHECK(id=1),
      haaland_goals INTEGER,
      haaland_assists INTEGER,
      haaland_apps INTEGER,
      mbappe_goals INTEGER,
      mbappe_assists INTEGER,
      mbappe_apps INTEGER
    )
  `);

  db.get("SELECT COUNT(*) AS c FROM stats", (err, row) => {
    if (row.c === 0) {
      db.run(`
        INSERT INTO stats 
        (id, haaland_goals, haaland_assists, haaland_apps,
         mbappe_goals, mbappe_assists, mbappe_apps)
         VALUES (1, 260, 60, 280, 320, 120, 360)
      `);
    }
  });
});

module.exports = db;
