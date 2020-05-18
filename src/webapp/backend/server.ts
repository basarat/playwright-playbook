import express, { Router } from 'express';
import basicAuth from 'express-basic-auth';

// Create app
const app = express();

// Auth example
app.use('/auth',
  basicAuth({
    challenge: true,
    unauthorizedResponse: () => 'Unauthenticated!',
    users: { 'username': 'password' },
  }),
  (_req, res) => res.send('Authenticated!')
);

// Static frontend
app.use(express.static('public'));

// API 
const api = Router();
const actions = [
  { name: 'Like', image: '/assets/like.png' },
  { name: 'Comment', image: '/assets/comment.png' },
  { name: 'Share', image: '/assets/share.png' },
  { name: 'Subscribe', image: '/assets/subscribe.png' },
];
api.use(express.json());
api.use((req, res, next) => {
  if (!req.body) res.status(400).send({ error: 'Invalid Request' });
  else next();
});
api.post('/actions', (req, res) => {
  if (!req.body.key) res.status(400).send({ error: 'Invalid Request' });
  else if (req.body.key !== 'playwright') res.status(401).send({ error: 'Invalid Key' });
  else res.send(actions);
});
app.use('/api', api);

// Start the server
const port = process.argv.length > 2 ? process.argv[2] : 9000;
app.listen(port, () => {
  console.log('Server started on port:', port);
});
