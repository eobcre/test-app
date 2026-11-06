import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  // email and password validation
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required.',
    });
  }

  try {
    const result = await pool.query(
      `SELECT id, name, email, password_hash
       FROM users
       WHERE email = $1`,
      [email],
    );

    const user = result.rows[0];

    // user validation
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password...',
      });
    }

    // password validation
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password...',
      });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

export default router;
