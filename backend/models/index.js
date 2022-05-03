//Importation package et configuration de sequelize
const dbConfig = require("../db/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
})
// const authJwt = require("../middleware/authJwt");

// module.exports = {
//   authJwt
// };
//mise en place des databases constituant mon API
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user")(sequelize, Sequelize);
db.message = require("./message")(sequelize, Sequelize);
db.comment = require("./comment")(sequelize, Sequelize);
db.like = require("./like")(sequelize, Sequelize);
//Mise en relation des différente db de "un a plusieurs" avec HasMany et belongsTo,
// ainsi que de "plusieurs à plusieurs avec belongsToMany et belongsTo.
db.user.hasMany(db.message, { as: "message" });
db.user.hasMany(db.comment, { as: "comment" });
db.message.hasMany(db.comment, { as: "comment" });
db.message.belongsTo(db.user, {
  foreignKey: {
    field: "userId",
    allowNull: false
  },
  as: "user",
  onDelete: "cascade"
});
db.comment.belongsTo(db.message, {
  foreignKey: {
    field: "messageId",
    allowNull: false
  },
  as: "message",
  onDelete: "cascade"
});

db.comment.belongsTo(db.user, {
  foreignKey: {
    field: "userId",
    allowNull: false
  },
  as: "user",
  onDelete: "cascade"
});

//association des likes
db.user.belongsToMany(db.message, {
  through: db.like,
  foreignKey: {
    field: "userId",
    allowNull: false
  },
  otherKey: 'messageId',
  onDelete: "cascade"
})

db.message.belongsToMany(db.user, {
  through: db.like,
  foreignKey: {
    field: "messageId",
    allowNull: false
  },
  otherKey: 'userId',
  onDelete: "cascade"
})

db.like.belongsTo(db.user, {
  foreignKey: {
    field: "userId",
    allowNull: false
  },
  as: "user",
  onDelete: "cascade"
})

db.like.belongsTo(db.message, {
  foreignKey: {
    field: "messageId",
    allowNull: false
  },
  as: "message",
  onDelete: "cascade"
})
//exportation de la database.
module.exports = db; 
