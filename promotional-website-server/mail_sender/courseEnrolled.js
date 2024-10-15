const nodemailer = require('nodemailer');
const expressAsyncHandler = require("express-async-handler");
require('dotenv').config();

// Create transporter
const transporter = nodemailer.createTransport({
host: "smtp.gmail.com", 
port: 465, 
secure: true, 
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEnrollmentEmail = (recipientEmail, courseName, paymentType, imageUrl) => {
  const mailOptions = {
    from:`Enrollement Info ${process.env.EMAIL}`,
    to: recipientEmail,
    subject: `🎉 Welcome to the Training Trains!`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; border: 1px solid #eaeaea;">
        <h1 style="text-align: center; color: #4CAF50;">Course Enrollment Confirmation 🎓</h1>
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">
          Congratulations on enrolling in <strong>${courseName}</strong>! 
          We are excited to have you on board. You have successfully completed the enrollment using <strong>${paymentType}</strong> payment method.
        </p>
        
        <img src="${imageUrl}" alt="Course Image" style="width: 100%; border-radius: 8px; margin-top: 20px;"/>
        
        <p style="font-size: 16px;">
          If you have any questions or need further assistance, feel free to reach out to our support team.
        </p>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://example.com" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Visit Our Website</a>
        </div>

        <footer style="margin-top: 40px; text-align: center; font-size: 12px; color: #888;">
          <p>© 2024 Your Company Name. All rights reserved.</p>
          <p>123 Main Street, Your City, Your Country</p>
        </footer>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const imageUrl = 'https://img.freepik.com/free-vector/course-enrollment-abstract-concept-vector-illustration-enroll-course-apply-degree-program-add-study-plan-online-enrollment-system-registration-form-new-student-abstract-metaphor_335657-5898.jpg?t=st=1729001601~exp=1729005201~hmac=08bb2fa4d57cad4d4b124145883a6c3d3a9f29fc6a194e8fe015a4646405b181&w=740';

const CourseEnrolled=expressAsyncHandler(async(req, res) => {
    console.log("Enrolled Mail request");
    console.log(process.env.EMAIL,process.env.EMAIL_PASSWORD);
    try{

  const { email, courseName, paymentType } = req.body;
  sendEnrollmentEmail(email, courseName, paymentType, imageUrl);
  res.status(200).json({ message: 'Attractive email sent successfully!' });
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports={CourseEnrolled}
