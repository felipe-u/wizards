const User = require("../models/user");

const mongoDb = require("mongodb");

exports.getUsers = (req, res, next) => {
  User.find().then((users) => {
    res.status(200).json({ users: users });
  });
};

exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const age = req.body.age;
  const user = new User({ name: name, imageUrl: imageUrl, age: age });
  user
    .save()
    .then(() => {
      return res.status(201).json({ message: "User created successfully!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

exports.editUser = (req, res, next) => {
  const id = new mongoDb.ObjectId(req.body._id);
  const updatedName = req.body.name;
  const updatedImageUrl = req.body.imageUrl;
  const updatedAge = req.body.age;
  User.findById(id)
    .then((user) => {
      user.name = updatedName;
      user.imageUrl = updatedImageUrl;
      user.age = updatedAge;
      return user.save();
    })
    .then(() => {
      console.log("Updated User!");
      return res.status(200).json({ message: "User updated successfully!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.body.userId;
  User.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).json({ message: "User deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  console.log(req.body.userId);
};

exports.findUser = (req, res, next) => {
  User.findById(req.params.userId).then((user) => {
    res.status(200).json(user);
  });
};
