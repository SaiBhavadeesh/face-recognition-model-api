const handleSignup = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json("validation failed!");
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .then((_) =>
        trx("users")
          .returning("*")
          .insert({
            name: name,
            email: email,
            joined: new Date(),
          })
          .then((user) => res.json(user[0]))
      )
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to signup"));
};

module.exports = { handleSignup: handleSignup };
