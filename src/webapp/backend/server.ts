import express from 'express';
import basicAuth from 'express-basic-auth';

// Create app
const app = express();

// Auth example
app.use('/auth', basicAuth({
  users: { 'admin': 'supersecret' },
}));

// Static frontend
app.use(express.static('public'));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log('Server started on port:', port);
});
