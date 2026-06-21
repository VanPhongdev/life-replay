import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Life Replay API');
});

export default app;