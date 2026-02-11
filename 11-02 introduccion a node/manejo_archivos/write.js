const fs = require('fs');

const data = 'Hola, este es un archivo de texto creado con Node.js';

// Escribir en un archivo
fs.writeFile('archivo.txt', data, err => {
    if (err) throw err;
    console.log('Archivo creado y datos escritos');
});