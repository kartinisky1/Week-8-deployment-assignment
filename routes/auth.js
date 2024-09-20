const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ where: { username } });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    const newUser = await User.create({ username, password });

    // Prepare JWT payload
    const payload = {
      user: {
        id: newUser.id
      }
    };

    // Sign and return JWT
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
   
// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    let user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Prepare JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign and return JWT
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
