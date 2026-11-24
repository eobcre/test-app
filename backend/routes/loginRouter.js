import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import pool from '../db.js';

import { verifyToken } from '../middleware/verify.js';

const router = express.Router();

/*
- login API
- JWT token generation
- save JWT in HTTP-only cookie
- get user info API
*/

// === login API ===
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

    // === JWT token ===
    // generate JWT token
    const token = jwt.sign(
      {
        sub: String(user.id), // payload
      },
      process.env.JWT_SECRET, // secret key
      { expiresIn: '15m' }, // options
    );

    // save JWT in HTTP-only cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15m
      path: '/',
    });

    return res.status(200).json({
      message: 'Login successful!!!',
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

// === verify and get user info API ===
router.get('/me', verifyToken, async (req, res) => {
  // do not cache
  res.set('Cache-Control', 'no-store');

  const result = await pool.query(
    `SELECT id, name, email, role_id
     FROM users
     WHERE id = $1`,
    [req.userId],
  );

  const user = result.rows[0];

  if (!user) {
    return res.status(401).json({
      message: 'User Not Found.',
    });
  }

  return res.json({ user });
});

// log out
router.post('/logout', (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  res.json({ message: 'You have logged out.' });
});

export default router;
