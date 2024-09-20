const express = require('express');
const sequelize = require('./config/database');
const { User, Expense, Category, PaymentMethod, Budget } = require('./models');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const budgetRoutes = require('./routes/budgets');

const app = express();

app.use(express.static('public'));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', budgetRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;

// Sync database and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
