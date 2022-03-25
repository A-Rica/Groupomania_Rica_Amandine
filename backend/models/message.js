module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      text: {
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