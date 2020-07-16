const path = require('path');
const express = require('express');
const cors = require('cors');

if (!process.env.NODE_ENV) require('dotenv').config();

// We need to pass to stripe instance the private key
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  // Specifying to use our static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.post('/payment', (req, res) => {
  const { token, amount } = req.body;

  const body = {
    source: token.id,
    currency: 'usd',
    amount,
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).json({ error: stripeErr });
      console.log(stripeErr);
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

app.listen(PORT, () => {
  console.log('Server up and running on port ' + PORT);
});
