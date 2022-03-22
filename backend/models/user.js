module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
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
        type: Sequelize.STRING,
        defaultValue: "http://localhost:3000/pardefaut.png1647426103961.png"
      },
 
    });
    return User;
  }; 