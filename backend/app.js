const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users");
const tournamentRoutes = require("./routes/tournament");
const Tournament = require("./models/tournament");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.use(usersRoutes);
app.use("/tournament",tournamentRoutes);

// Tournament

mongoose
  .connect(
    "mongodb+srv://felipeuv:y1XvGYC64VsgorPi@cluster0.crg1g.mongodb.net/wizards?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    Tournament.findOne().then((tournament) => {
      if (!tournament) {
        const tournament = new Tournament({
          name: "War Season",
          users: [],
        });
        tournament.save();
        console.log("Tournament created successfully!");
      }
      console.log("Tournament already exists");
    });
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
