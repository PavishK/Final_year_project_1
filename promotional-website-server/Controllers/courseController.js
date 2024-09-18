const Course=require("../modals/courseModel");
const expressAsyncHandler = require("express-async-handler");

const addCourse=expressAsyncHandler(async(req, res) => {
    try {
        const courses = req.body;
        await Course.insertMany(courses);
        res.status(200).send('Courses added successfully!');
        console.log("Course Added successfully!");
    } catch (error) {
        res.status(500).send('Error adding courses');
    }
});

const displayCourse=expressAsyncHandler(async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
        console.log("Data fetched by -> ",req.url);
    } catch (error) {
        res.status(500).send('Error fetching courses');
    }
});

module.exports={
    addCourse,
    displayCourse
};