const { DataSource } = require("typeorm");
const UserSchema = require("./entity/User");

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "bd_ventas",
  synchronize: true, // elimina y vuelve a crear la base de dato cada vez que se reinicia el servidor
  logging: false,
  entities: [UserSchema],
});

module.exports = AppDataSource;
