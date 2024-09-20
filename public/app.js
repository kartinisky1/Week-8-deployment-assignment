// DOM elements
const loginPage = document.getElementById('login-page');
const registerPage = document.getElementById('register-page');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const expenseForm = document.getElementById('expense-form');
const budgetForm = document.getElementById('budget-form');
const expenseList = document.getElementById('expense-list');
const budgetList = document.getElementById('budget-list');
const totalExpenses = document.getElementById('total-expenses');
const logoutButton = document.getElementById('logout');
const expensesSection = document.getElementById('expenses-section');
const budgetsSection = document.getElementById('budgets-section');

// Navigation
document.getElementById('show-register').addEventListener('click', () => {
    loginPage.style.display = 'none';
    registerPage.style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
    registerPage.style.display = 'none';
    loginPage.style.display = 'block';
});

document.getElementById('show-expenses').addEventListener('click', () => {
    expensesSection.style.display = 'block';
    budgetsSection.style.display = 'none';
});

document.getElementById('show-budgets').addEventListener('click', () => {
    expensesSection.style.display = 'none';
    budgetsSection.style.display = 'block';
});

// Authentication
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {  // localhost:3000/api/auth/login
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            showDashboard();
        } else {
            alert('Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('Registration successful. Please login.');
            registerPage.style.display = 'none';
            loginPage.style.display = 'block';
        } else {
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    dashboard.style.display = 'none';
    loginPage.style.display = 'block';
});

// Expense management
expenseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;

    try {
        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ description, amount: parseFloat(amount) })
        });

        if (response.ok) {
            fetchExpenses();
            expenseForm.reset();
        } else {
            alert('Failed to add expense. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Budget management
budgetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('budget-amount').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    try {
        const response = await fetch('/api/budgets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ amount: parseFloat(amount), startDate, endDate })
        });

        if (response.ok) {
            fetchBudgets();
            budgetForm.reset();
        } else {
            alert('Failed to set budget. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

async function fetchExpenses() {
    try {
        const response = await fetch('/api/expenses', {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });

        if (response.ok) {
            const expenses = await response.json();
            displayExpenses(expenses);
        } else {
            console.error('Failed to fetch expenses');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchBudgets() {
    try {
        const response = await fetch('/api/budgets', {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });

        if (response.ok) {
            const budgets = await response.json();
            displayBudgets(budgets);
        } else {
            console.error('Failed to fetch budgets');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayExpenses(expenses) {
    expenseList.innerHTML = '';
    let total = 0;
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.description}: $${expense.amount}`;
        expenseList.appendChild(li);
        total += parseFloat(expense.amount);  // Ensure each amount is treated as a number
    });
    totalExpenses.textContent = total.toFixed(2);  // Ensure total is a number formatted to two decimal places
}


function displayBudgets(budgets) {
    budgetList.innerHTML = '';
    budgets.forEach(budget => {
        const li = document.createElement('li');
        li.textContent = `Budget: $${budget.amount} (From: ${budget.startDate} To: ${budget.endDate})`;
        budgetList.appendChild(li);
    });
}

function showDashboard() {
    loginPage.style.display = 'none';
    registerPage.style.display = 'none';
    dashboard.style.display = 'block';
    fetchExpenses();
    fetchBudgets();
}

// Check if user is logged in
if (localStorage.getItem('token')) {
    showDashboard();
}
