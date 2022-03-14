module.exports = (sequelize, Sequelize) => {
    const Administration = sequelize.define("administration", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
     
      nom: {
        type: Sequelize.STRING 
      }
        });
    return Administration;
  };