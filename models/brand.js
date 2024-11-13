module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define('Brand', {
        Name: Sequelize.DataTypes.STRING,
    },{
        timestamps: false,
    });
    Brand.associate = function(models) {
        Brand.hasMany(models.Guitar)
    };
	return Brand
}