module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'Products',
        {
            title: DataTypes.STRING,
            reviews: DataTypes.ARRAY(DataTypes.STRING)
        },
        {}
    )
