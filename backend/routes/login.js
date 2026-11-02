import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const email = req.query.email;
  console.log('email:', email);

  res.json({
    message: `Login API called with email: ${email}`,
  });
});

export default router;
