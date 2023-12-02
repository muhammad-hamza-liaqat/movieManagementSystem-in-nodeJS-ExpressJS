require("dotenv").config();
const nodemailer = require("nodemailer");
const Queue = require("bull");
const JobModel = require("../Models/JobModel"); 

async function saveDataJobCollection(jobData) {
  try {
    const detail = jobData;
    // Use 'JobModel' instead of 'job' here
    var jobDocument = await JobModel.create({
      detail
    });
    console.log("data saved to the database- Jobsdatabase")
    return jobDocument;
  } catch (error) {
    console.error("error saving job data to DB", error);
    throw error;
  }
}

const emailQueue = new Queue("email", {
  limiter: {
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

emailQueue.process(async (job) => {
  const { to, subject, text } = job.data;
  const mainOptions = {
    from: "mh408800@gmail.com",
    to,
    subject,
    text,
  };
  try {
    // Save job data to MongoDB before processing
    const jobDb = await saveDataJobCollection(job.data);

    // Process the job (send email)
    await transporter.sendMail(mainOptions);
    console.log(`Email sent to ${to}`);

    
    setTimeout(async () => {
      
      await JobModel.deleteOne({ _id: jobDb.id });
      console.log("Job removed from MongoDB:", jobDb.id);
    }, 1000); //1 sec

    // Close the transport connection after processing
    transporter.close();
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

module.exports = { emailQueue };
