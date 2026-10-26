import express from 'express';
import pool from '../db.js';

import { statesJson } from '../utils/statesData.js';

const router = express.Router();

// search api
router.get('/', async (req, res) => {
  const searchTerm = String(req.query.search ?? '').trim();
  // console.log('searchTerm:', searchTerm);
  // res.send(`Received: ${searchTerm}`);

  // validation - search
  if (!searchTerm) {
    return res.status(400).json({
      message: 'Type something...',
    });
  }

  try {
    const result = await pool.query(
      `WITH state_data AS (
        SELECT
          LOWER(key) AS state_code,
          LOWER(value) AS full_state_name
        FROM jsonb_each_text($2::jsonb)
        )

        SELECT h.*
        FROM hospitals AS h

        LEFT JOIN state_data AS s
          ON LOWER(TRIM(h.state)) = s.state_code
          OR LOWER(TRIM(h.state)) = s.full_state_name

        WHERE LOWER($1) = s.state_code
           OR word_similarity($1, COALESCE(s.full_state_name, h.state, '')) > 0.4
           OR word_similarity($1, COALESCE(h.name, '')) > 0.4
           OR word_similarity($1, COALESCE(h.address, '')) > 0.4
           OR word_similarity($1, COALESCE(h.city, '')) > 0.4
           OR word_similarity($1, COALESCE(h.state, '')) > 0.4
           OR word_similarity($1, COALESCE(h.postcode, '')) > 0.4
           OR word_similarity($1, COALESCE(h.phone, '')) > 0.4
           
        ORDER BY h.id`,
      // $1, $2
      [searchTerm, statesJson],
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
