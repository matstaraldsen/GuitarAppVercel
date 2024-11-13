module.exports = (sequelize, Sequelize) => {
    const Color = sequelize.define('Color', {
        Name: Sequelize.DataTypes.STRING,
    },{
        timestamps: false,
    });
    Color.associate = function(models) {
        Color.hasMany(models.Guitar)
    };
	return Color
}