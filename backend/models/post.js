module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
      titre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      texte: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      image: {
        type: Sequelize.STRING
      },

      date: {
        type: Sequelize.DATE,
        defaultValue: sequelize.NOW
      }
    });
    return Message;
  };