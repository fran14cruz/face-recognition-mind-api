const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'francruz',
    password: '',
    database: 'recognition-mind',
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'Francisco',
      email: 'andres@hotmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '321',
      name: 'Maria',
      email: 'maria@hotmail.com',
      password: 'donuts',
      entries: 0,
      joined: new Date()
    },
  ]
}

app.get('/', (req, res) => {
  res.send('this works');
})

app.post('/signin', (req, res) => {
  // res.json('signin'); // "signin"
  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
        res.json('success');
  } else {
    res.status(400).json('error login in');
  }
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // hash password with bcrypt
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  // transaction: data should be stored in 'users' and 'login' tables
  // at the end of this request, there should not be any inconsistencies
  // transactions are used when you want to do more than one thing.
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
      .returning('*')
      .insert({
        email: loginEmail[0].email,
        name: name,
        joined: new Date()
      })
      .then(user => {
        res.json(user[0]);
      })
    })
    .then(trx.commit)
    .catch(trx.rollback) // in case anything fails, rollback changes
  })
  .catch(err => res.status(400).json('unable to register'));
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  db.select('*').from('users').where({id})
    .then(user => { // if not found, the database returns an empty array
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('not found');
      }
    })
    .catch(err => res.status(400).json('error getting user'));
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(error => res.status(400).json('unable to get entries'))
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
});