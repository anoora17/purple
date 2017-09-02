module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    orderdate: DataTypes.DATE

  });

  Order.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Order.belongsTo(models.Customer);
    Order.hasMany(models.Orderitems, {
      onDelete: "cascade"
    });
  };

  return Order;
};
