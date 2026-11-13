import express from 'express';
import cors from 'cors';

import hospitalRouter from './routes/hospitalRouter.js';
import loginRouter from './routes/loginRouter.js';
import { message } from './data/data.js';

import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(cookieParser());

app.use('/api/hospitals', hospitalRouter);
app.use('/api/login', loginRouter);

// app.get('/', (req, res) => {
//     res.send("Express server test.")
// })

app.get('/api/message', (req, res) => {
  res.json(message);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
