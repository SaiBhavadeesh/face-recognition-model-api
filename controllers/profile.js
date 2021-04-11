const handleProfile = (db) => (req, res) => {
  const { userId } = req.params;
  db.select("*")
    .from("users")
    .where({ id: userId })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(404).json("No user found");
      }
    })
    .catch((err) => res.status(404).json("error getting user"));
};

module.exports = { handleProfile };
