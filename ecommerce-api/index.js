const path = require('path');
const express = require('express');
const stripe = require('stripe');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// If we are in production, we want to server also our static files
// which is the build of our react app
if (process.env.NODE_ENV === 'production') {
  // Specifying to use our static files
  app.use(express.static(path.join(__dirname, 'public/build')));

  // app.get('*', (req, res) => {
  //   res.render()
  // })
}

app.post('/payment', (req, res) => {
  const { token } = req.body;

  res.status(200).json({
    name: 'Omar Osuna',
  });
});

app.listen(PORT, () => {
  console.log('Server up and running on port ' + PORT);
});
