const dbConfig = require("../db/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});
const authJwt = require("../middleware/authJwt");

module.exports = {
  authJwt
};

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.test = require("./test.model")(sequelize, Sequelize);
db.users = require("./users")(sequelize, Sequelize);
db.messages = require("./post")(sequelize, Sequelize);
db.commentaire = require("./commentaire")(sequelize, Sequelize);
db.tutorials = require("./tutorial.model")(sequelize, Sequelize);
db.comments = require("./comments.model")(sequelize, Sequelize);

db.users.hasMany(db.messages, { as: "messages" });
db.messages.belongsTo(db.users, {
  foreignKey: "usersId",
  as: "users",
});

module.exports = db; 
