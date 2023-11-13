const express = require("express");
const app = express();
const { userModel, validateUser } = require("../Models/UserModel");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");

UserRouter.route("/add-user")
  .get((req, res) => {
    res.send("add-user-get-method");
  })
  .post(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const { name, email, password } = req.body;

    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).send("user created!");
  });
//   route to find the required ID
UserRouter.post("/find/:id", async (req, res) => {
  let userToFind = await userModel.findById(req.params.id);
  if (!userToFind) {
    return res.status(400).send({ message: "user not found!" });
  }
  res.status(200).send(userToFind.name);
});

module.exports = UserRouter;
