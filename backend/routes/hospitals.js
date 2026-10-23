import express from 'express';
import pool from '../db.js';

import statesData from '../utils/statesData.js';

const router = express.Router();

// search api
router.get('/', async (req, res) => {
  const searchTerm = req.query.search;
  // console.log('searchTerm:', searchTerm);
  // res.send(`Received: ${searchTerm}`);

  // validation - search
  if (!searchTerm || !searchTerm.trim()) {
    return res.status(400).json({
      message: 'Type something...',
    });
  }

  try {
    const result = await pool.query(
      `SELECT id, name, address, city, state, postcode, phone
         FROM hospitals
         WHERE $1 <% name
         ORDER BY word_similarity($1, name) DESC, id
         LIMIT 10`,
      [searchTerm.trim()],
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ messgae: 'Failed to search...' });
  }
});

// save api
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, city, state, postcode, phone } = req.body;
  console.log('req.params', req.params);
  console.log('req.body', req.body);

  try {
    const result = await pool.query(
      `UPDATE hospitals
       SET name = $1,
           address = $2,
           city = $3,
           state = $4,
           postcode = $5,
           phone = $6
       WHERE id = $7
       RETURNING *`,
      [name, address, city, state, postcode, phone, id],
    );

    // console.log('result', result);

    res.json(result.rows[0]);
    // console.log('result.rows[0]', result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update...' });
  }
});

export default router;
