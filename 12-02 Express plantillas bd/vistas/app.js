const express = require('express');
const app = express();
const PORT = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/calcular', (req, res) => {
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
    const resultado = num1 + num2;
    res.render('resultado', { resultado });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
