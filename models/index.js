const User = require('./User');
const Expense = require('./Expense');
const Category = require('./Category');
const PaymentMethod = require('./PaymentMethod');
const Budget = require('./Budget');

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Category, { foreignKey: 'userId' });
Category.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(PaymentMethod, { foreignKey: 'userId' });
PaymentMethod.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Budget, { foreignKey: 'userId' });
Budget.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

Category.hasMany(Budget, { foreignKey: 'categoryId' });
Budget.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = {
  User,
  Expense,
  Category,
  PaymentMethod,
  Budget
};