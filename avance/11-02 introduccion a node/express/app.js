// import express from 'express'; // Si usas ES Modules
const express = require('express'); // Si usas CommonJS
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('<h1 style="color: blue;">¡Hola, mundo!</h1>');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});