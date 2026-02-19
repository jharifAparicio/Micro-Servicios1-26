const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Importa la conexión a la base de datos
const expressLayouts = require('express-ejs-layouts');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'
app.set('view engine', 'ejs'); // Configura EJS como el motor de plantillas
app.set('views', './views'); // Configura la carpeta de vistas
app.use(expressLayouts);
app.set('layout', 'layout');
const port = 3000;

app.get('/', (req, res) => {
    const query = 'SELECT * FROM productos';
    db.query(query , (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products:' + err.message);
            return;
        }
        res.render('index', { productos: results }); // Renderiza la vista 'index' con los productos
    });
});

app.get('/create', (_, res) => {
    res.render('create'); // Renderiza la vista 'create' para agregar un nuevo producto
});

app.post('/create', (req, res) => {
    const { nombre, precio, stock } = req.body;
    const query = 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)';

    db.query(query, [nombre, precio, stock], (err) => {
        if (err) {
            console.error('Error adding product:', err);
            res.status(500).send('Error adding product: ' + err.message);
            return;
        }
        res.redirect('/'); // Redirige a la página principal después de agregar el producto
    });
});

app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM productos WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching product:', err);
            res.status(500).send('Error fetching product: ' + err.message);
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Product not found');
            return;
        }
        res.render('edit', { producto: results[0] }); // Renderiza la vista 'edit' con el producto a editar
    });
});

app.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;
    const query = 'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?';

    db.query(query, [nombre, precio, stock, id], (err) => {
        if (err) {
            console.error('Error updating product:', err);
            res.status(500).send('Error updating product: ' + err.message);
            return;
        }
        res.redirect('/'); // Redirige a la página principal después de actualizar el producto
    });
});

    app.post('/delete/:id', (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM productos WHERE id = ?';

        db.query(query, [id], (err) => {
            if (err) {
                console.error('Error deleting product:', err);
                res.status(500).send('Error deleting product: ' + err.message);
                return;
            }
            res.redirect('/'); // Redirige a la página principal después de eliminar el producto
        });
    });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});