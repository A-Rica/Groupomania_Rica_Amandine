const dbConfig = require("../db/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.test = require("./test.model")(sequelize, Sequelize);
db.users = require("./users")(sequelize, Sequelize);
db.message = require("./post")(sequelize, Sequelize);
db.commentaire = require("./commentaire")(sequelize, Sequelize);
db.administration = require("./administration")(sequelize, Sequelize);

module.exports = db;
