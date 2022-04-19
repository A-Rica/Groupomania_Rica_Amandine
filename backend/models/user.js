module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,

    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,

    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,

    },
    password: {
      type: Sequelize.JSON,
      allowNull: false,

    },
    image: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.ENUM('utilisateur', 'administrateur'),
      defaultValue: "utilisateur",
      // allowNull: false,
    },
  });
  return User;
}; 