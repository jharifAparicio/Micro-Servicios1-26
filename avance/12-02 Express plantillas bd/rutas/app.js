const express = require('express'); // Si usas CommonJS
const app = express();
const port = 3000;

app.use(express.json()); // Middleware para parsear JSON
app.get('/', (_, res) => {
    res.send('<h1 style="color: blue;">bienvenido a express</h1>');
});

app.post('/usuario', (req, res) => {
    const {nombre, edad} = req.body;
    res.send(`Hola ${nombre}, tienes ${edad} años.`);
}); 

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});