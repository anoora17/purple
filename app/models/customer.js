// Jay
// Noor Edit
var bcryptjs = require('bcryptjs'); // for hashing

module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("customer", {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		firstname: { type: DataTypes.STRING,notEmpty: true},
		lastname: { type: DataTypes.STRING,notEmpty: true},
    email:{type:DataTypes.STRING, validate:{isEmail:true}},
    password: {type: DataTypes.STRING,allowNull: false },
         add: {type:DataTypes.TEXT},
    zipicode:{type: DataTypes.INTEGER, validate:{isNumeric: true}},

  });

  // Customer.associate = function(models) {
  //   // Associating customers with orders
  //   // When an cutomer is deleted, also delete any associated orders
  //   Customer.hasMany(models.Order, {
  //     onDelete: "cascade"
  //   });
  // };

  return Customer;
};
// folow the documention on bcrypt https://www.npmjs.com/package/bcrypt
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

module.exports.createCustomer = function( newCustomer, cb){
  bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        newCustomer.password = hash;
        newCustomer.save(cb);
      });
  });


}
