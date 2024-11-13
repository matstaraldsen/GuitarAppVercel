module.exports = (sequelize, Sequelize) => {
    const Guitar = sequelize.define('Guitar', {
        Year: Sequelize.DataTypes.DATE,
        Price: Sequelize.DataTypes.DOUBLE,
    }, {
        timestamps: false
    });
    Guitar.associate = function (models) {
        Guitar.belongsTo(models.Model)
        Guitar.belongsTo(models.Color)
        Guitar.belongsTo(models.Brand)
    };

    return Guitar
}
