const apiKey = require("../user");
const Clarifai = require("clarifai");

var app = new Clarifai.App({
  apiKey: apiKey.key,
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("unable to respond"));
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      if (entries.length) {
        res.json(entries[0]);
      } else {
        res.status(404).json("No user found");
      }
    })
    .catch((err) => res.status(404).json("error getting entries"));
};

module.exports = { handleImage, handleApiCall };
