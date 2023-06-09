const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const app = express();
const port = 3000;
const User = require("./models/User");
const mongoose = require("mongoose");
app.use(express.json());

const dbURI = process.env.DB_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ error: "error" });
    });
});
app.post("/users", (req, res) => {
  const Newperson = new User({
    firstName: "Ayman",
    lastName: "ibrahim",
    age: 20,
    sports: ["swimming"],
  });
  Newperson.save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ error: "error" });
    });
});
app.put("/users", (req, res) => {
  const userId = "648368ead5a34e9ec3817886";
  const updatedUser = {
    firstName: "Ahmed",
    lastName: "hoss",
    age: 30,
    sports: ["padel"],
  };
  User.findByIdAndUpdate(userId, updatedUser, { new: true })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(404).json({ error: "user not found" });
    });
});
app.delete("/users", (req, res) => {
  const userId = "648369392419a05750683091";

  User.findByIdAndDelete(userId)
    .then((user) => {
      res.json({ message: "User Delteed" });
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(404).json({ error: "user not found" });
    });
});
app.listen(port, function () {
  console.log(
    "The server is running, please open your browser at http://localhost:%s",
    port
  );
});
