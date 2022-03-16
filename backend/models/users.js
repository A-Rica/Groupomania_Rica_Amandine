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
        type: Sequelize.JSON,
        allowNull: false,
        
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: "http://localhost:3000/pardefaut.png1647426103961.png"
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
    return Utilisateurs;
  };