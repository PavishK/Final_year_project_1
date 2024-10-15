const express=require('express');

const {displayCourse, updateEnrolledCount}=require('../Controllers/courseController');
const {addEnrolledCourse,displayEnrolledCourse}=require('../Controllers/enrolledCourseController');

const Router = express.Router();

Router.get("/list-courses",displayCourse);

//Enrolled Course

Router.post("/add-booked-course",addEnrolledCourse);
Router.get("/enrolled-courses/:name",displayEnrolledCourse);
Router.put("/enrolled-course-count-increment/:id", updateEnrolledCount);

module.exports=Router;

