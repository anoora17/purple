module.exports = function(sequelize, DataTypes) {
  var Orderitems = sequelize.define("Orderitems", {
    productid: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(5.2)
  });
Orderitems.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Orderitems.belongsTo(models.Customer);
    Orderitems.hasMany(models.Orderitems, {
      onDelete: "cascade"
    });
  };
  return Orderitems;
};
