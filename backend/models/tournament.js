const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

tournamentSchema.methods.joinTournament = function (userId) {
  const userIntheTournament = this.users.includes(userId);
  if (!userIntheTournament) {
    this.users.push(userId);
    console.log("User successfully joined the tournament.");
  } else {
    return "already_exists";
  }
  return this.save();
};

tournamentSchema.methods.quitTournament = function (userId) {
  const updatedUsers = this.users.filter((user) => {
    return user._id.toString() !== userId;
  });
  this.users = updatedUsers;
  console.log("User quit the tournament");
  return this.save();
};

module.exports = mongoose.model("Tournament", tournamentSchema);
