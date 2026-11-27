import express from 'express';
import pool from '../db.js';
import { verifyToken } from '../middleware/verify.js';

const router = express.Router();

// get users
router.get('/users', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        u.id,
        u.name,
        u.email,
        r.name AS role
        FROM users u 
        JOIN roles r ON u.role_id = r.id
        ORDER BY id`,
    );
    return res.json({ users: result.rows });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Error to get user info...',
    });
  }
});

export default router;
