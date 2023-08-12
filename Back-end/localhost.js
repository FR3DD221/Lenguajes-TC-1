const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;
const fs = require("fs");
const bodyParser = require('body-parser');

app.use(cors());

//Se mandan las preguntas
app.get("/api/data", (req, res) => {
  fs.readFile("questions.json", "utf8", (err, data) => {
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
});

//Se manda el historial
app.get("/api/data2", (req, res) => {
  fs.readFile("history.json", "utf8", (err, data) => {
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
});

app.use(bodyParser.json());

app.post('/data', (req, res) => {
  const receivedData = req.body;
  console.log('Datos recibidos en el servidor:', receivedData);
  
  // Aquí puedes realizar el procesamiento de los datos recibidos
  const archivoJSON = 'history.json';
  let datosExistentes = [];
  try {
      const contenido = fs.readFileSync(archivoJSON, 'utf-8');
      datosExistentes = JSON.parse(contenido);
  } catch (error) {
      console.error('Error al leer el archivo JSON:', error);
  }

  // Agregar los nuevos datos a los datos existentes
  datosExistentes.push(receivedData);

  // Escribir los datos actualizados en el archivo JSON
  try {
      fs.writeFileSync(archivoJSON, JSON.stringify(datosExistentes, null, 2));
      console.log('Datos actualizados en el archivo JSON.');
  } catch (error) {
      console.error('Error al escribir en el archivo JSON:', error);
  }
  res.json(respuesta);
});

//El servidor se pone se escuchar peticiones
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});

/* 
  const archivoJSON = 'history.json';
  let datosExistentes = [];
  try {
      const contenido = fs.readFileSync(archivoJSON, 'utf-8');
      datosExistentes = JSON.parse(contenido);
  } catch (error) {
      console.error('Error al leer el archivo JSON:', error);
  }

  // Agregar los nuevos datos a los datos existentes
  datosExistentes.push(datosRecibidos);

  // Escribir los datos actualizados en el archivo JSON
  try {
      fs.writeFileSync(archivoJSON, JSON.stringify(datosExistentes, null, 2));
      console.log('Datos actualizados en el archivo JSON.');
  } catch (error) {
      console.error('Error al escribir en el archivo JSON:', error);
  }
  res.json(respuesta);
*/