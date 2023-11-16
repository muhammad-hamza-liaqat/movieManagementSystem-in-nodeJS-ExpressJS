require("dotenv").config();
const nodemailer = require("nodemailer");
const Queue = require("bull");
// const emailQueue = new Queue("email");
const jobModel = require("../Models/JobModel");
// const { Queue } = require("bullmq");


async function saveDataJobCollection(jobData){
  try{
    const detail = jobData;
    const job= await jobModel.create({
      detail
    });
    return job;
  }
  catch(error){
    console.error("error saving job data to DB", error);
    throw error;

  }
}
const emailQueue = new Queue("email",{
  limiter:{
    max: 10,
    duration: 1000
  },
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mh408800@gmail.com",
    pass: "fqplkcnwytbhzjjc",
  },
});



// const sendVerificationEmail = (email, verificationToken) => {
//   const emailData = {
//     to: email,
//     subject: "Account Verification",
//     html: `<p>Click the following link to verify your account: <a href="http://localhost:3000/user/verify/${verificationToken}">Verify</a></p>`,
//   };

//   transporter.sendMail(emailData, (e, info) => {
//     if (e) {
//       console.error("Error sending verification email:", e);
//     } else {
//       console.log("Email sent:", info.response);
//     }
//   });
// };
emailQueue.process(async (job)=>{
  const { to, subject, text } = job.data
  const mainOptions ={
    from: "mh408800@gmail.com", 
    to,
    subject,
    text,
  };
  try {
    // Save job data to MongoDB before processing
    const jobDb = await saveDataJobCollection(job.data);
    // Process the job (send email)
    await transport.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
    // Remove the job from MongoDB after processing
    await JobModel.deleteOne({ _id: jobDb.id });
    console.log("Job removed from MongoDB:", jobDb.id);
    // Close the transport connection after processing
    transport.close();
  } catch (error) {
    console.error("Error processing email job:", error.message);
  }
});
// Handle completed jobs
emailQueue.on("completed", (job) => {
  console.log(`Job ${job.id} has been completed`);
});
// Handle errors
emailQueue.on("failed", (job, error) => {
  console.error(`Job ${job.id} failed:`, error.message);
});
module.exports =  {emailQueue};