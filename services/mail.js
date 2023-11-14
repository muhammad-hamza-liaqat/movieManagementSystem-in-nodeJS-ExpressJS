// require("dotenv").config();

// const nodemailer = require("nodemailer");

// // google smtp setting
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_FROM,
//     pass: process.env.EMAIL_VC,
//     // google generated user key to use node mailer
//   },
// });
// // mail body
// const mailOption = {
//   from: process.env.EMAIL_FROM,
//   to: req.body.email,
//   subject: "Verify to Account",
//   html: `<p>Click the following link to verify your account, created at our website: <a href="http://localhost:3000/verify/${verificationToken}">Verify</a></p>`,
// };
// // handling the mail response
// transporter.sendMail(mailOption, (error, info) => {
//   if (error) {
//     console.error("Error sending verification email:", error);
//     return res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   } else {
//     console.log("Email sent:", info.response);
//     return res.json({
//       message: "Registration successful. Verification email sent.",
//     });
//   }
// });

// module.exports ={transporter, mailOption }

require("dotenv").config();
const nodemailer = require("nodemailer");

// Function to create and return a Nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Function to create and return mail options
const createMailOptions = (email = 'req.body.email', verificationToken) => {
  return {
    from: process.env.EMAIL_FROM,
    to: req.body.email,
    subject: "Verify Your Account",
    html: `<p>Click the following link to verify your account, created at our website: <a href="http://localhost:3000/verify/${verificationToken}">Verify</a></p>`,
  };
};

module.exports = {
  createTransporter,
  createMailOptions,
};

