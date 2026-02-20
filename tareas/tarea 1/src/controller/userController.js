const UserSchema = require("../entity/User");
const AppDataSource = require("../data-source");

const UserController = {
  async listUsers(req, res) {
    try {
      const userRepository = AppDataSource.getRepository(UserSchema);
      const users = await userRepository.find();
      res.render("usuarios/index", {
        lista: users,
        titulo: "Listado de Usuarios",
      });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios", error });
    }
  },

  async vistaCrear(req, res) {
    res.render("usuarios/create", { usuario: null });
  },

  // GUARDAR: Procesa tanto la creación como la edición
  async save(req, res) {
    try {
      const repo = AppDataSource.getRepository(UserSchema);
      const { id, name, email } = req.body;

      if (id) {
        // Actualizar si existe ID
        await repo.update(id, { name, email });
      } else {
        // Crear nuevo si no existe ID
        const nuevoUsuario = repo.create({ name, email });
        await repo.save(nuevoUsuario);
      }
      res.redirect("/usuarios");
    } catch (error) {
      console.error("Error en guardar:", error);
      res.status(500).send("No se pudo guardar el registro");
    }
  },

  // VISTA EDITAR: Busca un usuario y llena el formulario
  async vistaEditar(req, res) {
    try {
      const repo = AppDataSource.getRepository(UserSchema);
      const usuario = await repo.findOneBy({ id: parseInt(req.params.id) });

      if (!usuario) return res.status(404).send("Usuario no encontrado");

      res.render("usuarios/create", { usuario });
    } catch (error) {
      console.error("Error en vistaEditar:", error);
      res.status(500).send("Error al obtener datos del usuario");
    }
  },

  // ELIMINAR: Borra el registro por ID
  async eliminar(req, res) {
    try {
      const repo = AppDataSource.getRepository(UserSchema);
      await repo.delete(req.params.id);
      res.redirect("/usuarios");
    } catch (error) {
      console.error("Error en eliminar:", error);
      res.status(500).send("Error al eliminar el usuario");
    }
  },
};

module.exports = UserController;
