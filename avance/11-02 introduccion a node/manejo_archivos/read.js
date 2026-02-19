const fs = require('fs');

// Leer el archivo
fs.readFile('archivo.txt', 'utf8', (err, content) => {
    if (err) throw err;
    console.log('Contenido del archivo:', content);
});

/*
fs.promise.readFile('archivo.txt', 'utf8')
    .then(content => {
        console.log('Contenido del archivo:', content);
    })
    .catch(err => {
        console.error('Error al leer el archivo:', err);
    });

asinc/await

async function leerArchivo() {
    try {
        const content = await fs.promises.readFile('archivo.txt', 'utf8');
        console.log('Contenido del archivo:', content);
    } catch (err) {
        console.error('Error al leer el archivo:', err);
    }
}

leerArchivo();
*/