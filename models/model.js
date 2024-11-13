module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define('Model', {
        Name: Sequelize.DataTypes.STRING,
    },{
        timestamps: false,
    });
    Model.associate = function(models) {
        Model.hasMany(models.Guitar)
    };
	return Model
}