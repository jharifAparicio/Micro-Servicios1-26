const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h1>Formulario de suma</h1>
        <form action="/calcular" method="POST">
            <label for="num1">Numero 1:</label><br>
            <input type="text" id="num1" name="num1" required><br><br>
            <label for="num2">Numero 2:</label><br>
            <input type="text" id="num2" name="num2" required><br><br>
            <input type="submit" value="Enviar">
        </form>
    `);
});

app.post('/calcular', (req, res) => {
    const { num1, num2 } = req.body;
    res.send(`
        <p>El resultado de la suma es: ${parseFloat(num1) + parseFloat(num2)}</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
