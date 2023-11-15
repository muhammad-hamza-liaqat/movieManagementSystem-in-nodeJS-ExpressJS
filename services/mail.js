require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mh408800@gmail.com",
    pass: "fqplkcnwytbhzjjc",
  },
});

const sendVerificationEmail = (email, verificationToken) => {
  const emailData = {
    to: email,
    subject: "Account Verification",
    html: `<p>Click the following link to verify your account: <a href="http://localhost:3000/user/verify/${verificationToken}">Verify</a></p>`,
  };

  transporter.sendMail(emailData, (e, info) => {
    if (e) {
      console.error("Error sending verification email:", e);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = {
  transporter,
  sendVerificationEmail,
};
