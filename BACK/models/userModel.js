const pool = require('./db');

const createUser = async (dni, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (dni, password) VALUES ($1, $2) RETURNING *',
    [dni, hashedPassword]
  );
  return result.rows[0];
};

const findUserByDni = async (dni) => {
  const result = await pool.query('SELECT * FROM users WHERE dni = $1', [dni]);
  return result.rows[0];
};

module.exports = { createUser, findUserByDni };
