module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateur", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
      nom: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z  -]+$/i
        }
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z  -]+$/i
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[0-9a-zA-Z.-_]+[@]{1}[0-9a-zA-Z.-_]+[.]{1}[a-z]{3}$/i
        }
      },
      mot_de_passe: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9a-zA-Z]{60}$/i
        }
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: "https//"
      }
    });
    return Utilisateur;
  };