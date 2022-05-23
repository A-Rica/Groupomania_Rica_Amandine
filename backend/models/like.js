module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("like", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    userLiked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });
  return Like;
}; 