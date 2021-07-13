const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique:true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
});
const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});
const BasketProducts = sequelize.define('basket_products',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});
const Product = sequelize.define('product',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sku: {type: DataTypes.STRING, unique: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false}
});
const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProducts)
BasketProducts.belongsTo(Basket)

Product.hasMany(BasketProducts)
BasketProducts.belongsTo(Product)

Type.hasMany(Product)
Product.belongsTo(Type)

module.exports = {
    User,
    Product,
    Basket,
    BasketProducts,
    Type
};