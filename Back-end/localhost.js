const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;

app.use(cors());

app.get("/api/data", (req, res) => {
  const responseData = {
    message: "Datos de la API",
  };

  res.json(responseData);
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
