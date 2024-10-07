const express = require("express");
const {countUsersCoursesAndEnrolled,allUsersData,findIdAndUpdatePassword, deleteUserById, findCourseAndUpdate, addCourse, deleteCourse, fetchAllEnrolledData}=require("../Controllers/AdminController");

const Router = express.Router();

Router.get("/get-all-counts",countUsersCoursesAndEnrolled);
Router.get("/get-all-users-data",allUsersData);
Router.put("/update-users-data/:id",findIdAndUpdatePassword);
Router.delete("/delete-users/:id",deleteUserById);
Router.put("/update-course/:id",findCourseAndUpdate);
Router.post("/add-courses",addCourse);
Router.delete("/delete-course/:id",deleteCourse);
Router.get("/get-all-enrolled-data",fetchAllEnrolledData);



module.exports = Router;