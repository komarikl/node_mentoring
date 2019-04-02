module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'Users',
        {
            login: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {}
    )
