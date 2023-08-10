const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;
const fs = require("fs");

app.use(cors());

app.get("/api/data", (req, res) => {
  fs.readFile("questions.json", "utf8", (err, data) => {
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
