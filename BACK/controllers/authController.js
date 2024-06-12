const pool = require('../models/db');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  const { dni, password, username } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (dni, password, username) VALUES ($1, $2, $3) RETURNING *',
      [dni, hashedPassword, username]
    );
    res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

module.exports = { registerUser };
