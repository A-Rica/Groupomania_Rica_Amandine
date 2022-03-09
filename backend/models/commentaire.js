module.exports = (sequelize, Sequelize) => {
    const Commentaire = sequelize.define("commentaire", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
    return Commentaire;
  };