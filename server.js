const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex')

const postgres = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'francruz',
    password: '',
    database: 'recognition-mind',
  },
});

console.log(postgres.select('*').from('users'));

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
  const { name, email } = req.body;
  database.users.push({
    id: '123',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length-1]);
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
});