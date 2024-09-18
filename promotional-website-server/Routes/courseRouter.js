const express=require('express');

const {addCourse,displayCourse}=require('../Controllers/courseController');

const Router = express.Router();

Router.post("/add-courses",addCourse);
Router.get("/list-courses",displayCourse);

module.exports=Router;

