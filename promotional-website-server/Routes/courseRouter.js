const express=require('express');

const {addCourse,displayCourse}=require('../Controllers/courseController');
const {addEnrolledCourse,displayEnrolledCourse}=require('../Controllers/enrolledCourseController');

const Router = express.Router();

Router.post("/add-courses",addCourse);
Router.get("/list-courses",displayCourse);

//Enrolled Course

Router.post("/add-booked-course",addEnrolledCourse);
Router.get("/enrolled-courses/:id",displayEnrolledCourse);

module.exports=Router;

