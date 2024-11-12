const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json('incorrect form submission');
  }
  // hash password with bcrypt
  const saltRounds = 10;
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
}

module.exports = {
  handleRegister: handleRegister
}