require("dotenv").config();
const nodemailer = require("nodemailer");
const  Queue = require("bull");
const otpModel = require("../Models/OtpModel");

async function saveOtpJobCollection (data){
    try{
        const detail = data;
        // Use 'JobModel' instead of 'job' here
        var jobDocument = await otpModel.create({
            detail
        });
        console.log("data saved to the database- otp database")
        return jobDocument;
    }
    catch(error){
        console.log("error while saving otp to DB", error);
        throw error;
    }
}
const otpQueue = new Queue("otp", {
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


otpQueue.process(async (otp) => {
  const { to, subject, text } = otp.data;
  const mainOptions = {
    from: "mh408800@gmail.com",
    to,
    subject,
    text,
  };
  try {
    // Save job data to MongoDB before processing
    const otpDB = await saveOtpJobCollection(otp.data);

    // Process the job (send email)
    await transporter.sendMail(mainOptions);
    console.log(`Email sent to ${to}`);

    
    setTimeout(async () => {
      
      await otpModel.deleteOne({ _id: otpDB.id });
      console.log("Job removed from MongoDB:", otpDB.id);
    }, 1000); //1 sec

    // Close the transport connection after processing
    transporter.close();
  } catch (error) {
    console.error("Error processing otp job:", error.message);
  }
});

// Handle completed jobs
otpQueue.on("completed", (job) => {
  console.log(`otp ${job.id} has been completed`);
});

// Handle errors
otpQueue.on("failed", (job, error) => {
  console.error(`otp ${job.id} failed:`, error.message);
});

module.exports = { otpQueue };