const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users");

router.get("/users", usersController.getUsers);

router.get("/users/:userId", usersController.findUser);

router.post('/create-user', usersController.createUser);

router.post('/edit-user', usersController.editUser);

router.post('/delete-user', usersController.deleteUser);

module.exports = router;
