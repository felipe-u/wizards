const express = require("express");

const router = express.Router();

const tournamentController = require("../controllers/tournament");

router.post("/join", tournamentController.joinTournament);

router.post("/quit", tournamentController.quitTournament);

router.get("/all", tournamentController.showAllUsers);

module.exports = router;
