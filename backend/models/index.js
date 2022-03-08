const dbConfig = require("../db/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users")(sequelize, Sequelize);
db.message = require("./post")(sequelize, Sequelize);

module.exports = db;
