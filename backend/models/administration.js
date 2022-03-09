module.exports = (sequelize, Sequelize) => {
    const Administration = sequelize.define("administration", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
     
      id_users: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
        });
    return Administration;
  };