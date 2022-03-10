module.exports = (sequelize, Sequelize) => {
    const Utilisateurs = sequelize.define("utilisateurs", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
      nom: {
        type: Sequelize.STRING,
        allowNull: false,
       
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
       
      },
      mot_de_passe: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: "https//"
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
    return Utilisateurs;
  };