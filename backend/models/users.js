module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
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
      image: {
        type: Sequelize.STRING,
        defaultValue: "http://localhost:3000/pardefaut.png1647426103961.png"
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
    return Users;
  }; 