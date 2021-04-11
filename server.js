const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const user = require("../face-recognition-model-api/user");
const signup = require("./controllers/signup");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: user.name,
    password: user.password,
    database: "face-recognition-database",
  },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.json("started application"));
app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post("/signup", (req, res) => signup.handleSignup(req, res, db, bcrypt));
app.get("/profile/:userId", profile.handleProfile(db));
app.put("/image", image.handleImage(db));
app.post("/imageurl", image.handleApiCall);

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
