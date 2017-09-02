'use strict';
// Matching jay table the he originaly created but with some validations
module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    id: {
           type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
         },
    firstname: {
           type:DataTypes.STRING,
            notEmpty: true
         },
    lastname:{
          type:DataTypes.STRING,
          notEmpty: true
         },
    email:{
          type:DataTypes.STRING,
         validate:{isEmail:true}
        },
    password: {
         type:DataTypes.STRING,
           allowNull: false
        },
   addr1: {
         type: DataTypes.STRING
        },
   addr2: {
         type: DataTypes.STRING
        },
    city: {
         type: DataTypes.STRING
        },
   state: {
         type: DataTypes.STRING
        },
    zipicode:{
        type:DataTypes.INTEGER,
          validate:{isNumeric: true}
       }

  });

  Customer.associate = function(models) {
    // Associating customers with orders
    // When an cutomer is deleted, also delete any associated orders
    Customer.hasMany(models.Order, {
      onDelete: "cascade"
    });
  };

  return Customer;
};
// folow the documention on bcrypt https://www.npmjs.com/package/bcrypt // still working on appling it
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
