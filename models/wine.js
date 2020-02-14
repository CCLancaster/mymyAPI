'use strict';
module.exports = (sequelize, DataTypes) => {
  const wine = sequelize.define('wine', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    winery: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    suggest: DataTypes.INTEGER
  }, {});
  wine.associate = function(models) {
    // associations can be defined here
  };
  return wine;
};