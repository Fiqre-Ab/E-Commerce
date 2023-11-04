// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Define associations
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

//category has many product
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});
//product belong to many tag  through productTag
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

//tag belong to many products through productTag
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

// Export the models with associations
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
