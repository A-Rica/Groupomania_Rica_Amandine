module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    image: {
      type: Sequelize.STRING
    },

    video: {
      type: Sequelize.STRING
    },

    date: {
      type: Sequelize.DATE,
      defaultValue: sequelize.NOW
    }
  });
  return Comment;
};