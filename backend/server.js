import express from 'express';
import cors from 'cors';

import hospitalRouter from './routes/hospitals.js';
import { message } from './data/data.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use('/api/hospitals', hospitalRouter);

// app.get('/', (req, res) => {
//     res.send("Express server test.")
// })

app.get('/api/message', (req, res) => {
  res.json(message);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
