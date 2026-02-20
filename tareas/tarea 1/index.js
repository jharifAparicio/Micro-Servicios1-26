const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const AppDataSource = require("./src/data-source"); // Tu archivo de configuración de DataSource
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = 3000;

// --- CONFIGURACIÓN DE VISTAS (MVC) ---
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuración de Layouts
app.use(expressLayouts);
app.set("layout", "layouts/main"); // Ruta relativa a la carpeta 'views'

// --- MIDDLEWARES ---
// Importante: Esto permite que 'req.body' capture los datos de los formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos (por si quieres agregar CSS propio luego)
app.use(express.static(path.join(__dirname, "public")));

// --- RUTAS ---
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.redirect("/usuarios");
});

// --- INICIALIZACIÓN DE BASE DE DATOS Y SERVIDOR ---
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conexión a la base de datos establecida correctamente.");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar a la base de datos:", error);
    process.exit(1); // Detener el proceso si la DB falla
  });
