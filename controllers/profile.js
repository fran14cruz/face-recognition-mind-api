const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => { // if not found, the database returns an empty array
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('not found');
      }
    })
    .catch(err => res.status(400).json('error getting user'));
}

module.exports = {
  handleProfileGet
}