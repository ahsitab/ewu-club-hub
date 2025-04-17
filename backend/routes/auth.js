const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    console.log('Registration attempt:', req.body); // Log incoming request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
      console.log('Checking for existing user:', email);
      let user = await User.findOne({ email });

      if (user) {
        console.log('User already exists:', email);
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
        role: role || 'student'
      });

      console.log('Hashing password...');
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      console.log('Saving user...');
      await user.save();

      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      console.log('Generating JWT...');
      const token = jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 }
      );
      console.log('Registration successful for:', email);
      return res.json({ token });
    } catch (err) {
      console.error('Full registration error:', {
        message: err.message,
        stack: err.stack,
        requestBody: req.body,
        timestamp: new Date().toISOString()
      });
      res.status(500).json({ 
        error: 'Registration failed',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
);

// Handle unsupported methods for /register
router.get('/register', (req, res) => {
  res.status(405).json({
    error: 'Method not allowed',
    allowed: ['POST'],
    message: 'Please use POST to register a new user'
  });
});

router.put('/register', (req, res) => {
  res.status(405).json({
    error: 'Method not allowed', 
    allowed: ['POST']
  });
});

router.delete('/register', (req, res) => {
  res.status(405).json({
    error: 'Method not allowed',
    allowed: ['POST']
  });
});

module.exports = router;
