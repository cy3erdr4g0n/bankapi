
const { Model } = require('sequelize');

const UserModel = (sequelize, DataTypes) => {

    class User extends Model { }

    User.init({
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100),
        },
        firstname: {
            type: DataTypes.STRING(100),
        },
        middlename: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        lastname: {
            type: DataTypes.STRING(100),
        },
        resetPasswordToken : {
            type: DataTypes.STRING,
            allowNull: true
        },
        resetPasswordExpires : {
            type: DataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: true
        },

    },

        {
            sequelize,
            modelName: 'user',
            tableName: 'user',
            timestamps: true
        });

    return User;
}

module.exports = UserModel;
