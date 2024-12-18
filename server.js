const express = require('express');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false
  }
  },
});

const app = express();

app.use(bodyParser.json());
// Allow all origins requests
app.use(cors());

app.get('/', (req, res) => { res.send('this works') });
app.post('/signin', signin.handleSignin(db, bcryptjs)); // another way to passing the arguments
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcryptjs) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});