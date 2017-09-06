module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    imagepath:DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(5,2),
    description: DataTypes.STRING
  });

  return Product;
};
