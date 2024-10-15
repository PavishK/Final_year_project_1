const express=require('express');

const {CourseEnrolled} =require("../mail_sender/courseEnrolled");

const Router=express.Router();

Router.post('/send-enrollment-email',CourseEnrolled)

module.exports=Router;