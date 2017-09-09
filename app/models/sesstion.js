// model for the sessions table
module.exports = function(sequelize, DataTypes) {
    var Session = sequelize.define("Session", {
        success: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        TeammateId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Session.belongsTo(models.Customer, { 
                    onDelete: "cascade",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Session;
};
