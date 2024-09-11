const tournament = require("../models/tournament");
const Tournament = require("../models/tournament");
const User = require("../models/user");

const mongoDb = require("mongodb");

exports.joinTournament = (req, res, next) => {
  const userId = req.body.userId;
  Tournament.findOne({ name: "War Season" })
    .then((tournament) => {
      if (!tournament) {
        return res.status(404).json({ message: "Tournament not found" });
      }
      return tournament.joinTournament(userId);
    })
    .then((result) => {
      if (result === "already_exists") {
        return res
          .status(202)
          .json({ message: "User already in the tournament" });
      }
      res
        .status(201)
        .json({ message: "User successfully joined the tournament." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

exports.quitTournament = (req, res, next) => {
  const userId = req.body.userId;
  Tournament.findOne({ name: "War Season" })
    .then((tournament) => {
      if (!tournament) {
        return res.status(404).json({ message: "Tournament not found" });
      }
      return tournament.quitTournament(userId);
    })
    .then(() => {
      res.status(200).json({ message: "User removed successfully!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

exports.showAllUsers = (req, res, next) => {
  Tournament.findOne({ name: "War Season" })
    .populate("users")
    .then((tournament) => {
      if (!tournament) {
        return res.status(404).json({ message: "Tournament not found" });
      }
      res.status(200).json({ users: tournament.users });
    });
};
