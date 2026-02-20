const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "User",
  target: class User {},
  tableName: "usuarios",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      length: 100,
    },
    email: {
      type: "varchar",
      length: 100,
      unique: true,
    },
    isActive: {
      type: "boolean",
      default: true,
    },
  },
});
