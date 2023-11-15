const express = require("express");
const UserRouter = express.Router();
const { userModel, validateUser } = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mh408800@gmail.com",
    pass: "fqplkcnwytbhzjjc",
  },
});

UserRouter.route("/sign-up")
  .get((req, res) => {
    res.send("add-user-get-method");
  })
  .post(async (req, res) => {
    try {
      const { error } = validateUser(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      var verificationToken = uuidv4();

      const user = await userModel.create({
        ...req.body,
        password: hashedPassword,
        verificationToken: verificationToken,
        isVerified: false,
      });
      console.log(user);

      const mailOption = {
        from: "localhost@gmail.com",
        to: req.body.email,
        subject: "Account Verification",
        html: `<p>Click the following link to verify your account: <a href="http://localhost:3000/user/verify/${verificationToken}">Verify</a></p>`,
      };

      transporter.sendMail(mailOption, (e, info) => {
        if (e) {
          console.error("Error sending verification email:", e);
          res.status(500).json({ message: "Internal server error" });
        } else {
          console.log("Email sent:", info.response);
          res.json({
            message: "Registration successful. Verification email sent.",
          });
        }
      });
    } catch (error) {
      console.error("Unexpected error during user registration:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

UserRouter.route("/verify/:token").patch(async (req, res) => {
  try {
    const { token } = req.params;
    const user = await userModel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.send("Account verified successfully");
  } catch (error) {
    console.error("Error during account verification:", error);
    res
      .status(500)
      .json({ error: "Account not verified, Internal Server Error" });
  }
});

UserRouter.route("/find/:id")
  .get((req, res) => {
    res.end("find get-method");
  })
  .post(async (req, res) => {
    try {
      const userToFind = await userModel.findById(req.params.id);

      if (!userToFind) {
        return res.status(404).json({ message: "User not found!" });
      }

      res.status(200).send(userToFind.name);
    } catch (error) {
      console.error("catch block- find/:id", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // verif the user email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }
    // bcrypt.campare to password ans user password entered in the params
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }
    // won't login until the user is verified
    if (!user.isVerified) {
      return res
        .status(400)
        .json({
          message: "account not verified!, verify your account firstly.",
        });
    }

    res.json({ message: "User login successful!" });
  } catch (error) {
    console.error("error occured during login:", error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = UserRouter;
