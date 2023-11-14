const express = require("express");
const app = express();
const { userModel, validateUser } = require("../Models/UserModel");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");

UserRouter.route("/sign-up")
  .get((req, res) => {
    res.send("add-user-get-method");
  })

  .post(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    var hashedPassword = await bcrypt.hash(req.body.password, 10);

    const { name, email, password } = req.body;

    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).send("user created!");
  });
//   route to find the required ID
UserRouter.route("/find/:id")
.get((req,res)=>{
  res.end("find get-method");
})
.post(async (req, res) => {
  let userToFind = await userModel.findById(req.params.id);
  if (!userToFind) {
    return res.status(400).send({ message: "user not found!" });
  }
  res.status(200).send(userToFind.name);
});

UserRouter.post("/login", async (req,res)=>{
  const {email, password} = req.body;

  const user = await userModel.findOne({ email });
  console.log(user);
  if(!user){
    return res.status(400).send({message: "invalid email or password!"})
  }
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword){
    return res.status(400).send({message: "invalid email or password!"})
  }
  // res.send("user login!");
});

module.exports = UserRouter;
