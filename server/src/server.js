import express from 'express';

const server = express();

const port = process.env.PORT || 6002;

server.listen(6000, () => {
  console.log(`Server running on http://localhost${port}`);
});
