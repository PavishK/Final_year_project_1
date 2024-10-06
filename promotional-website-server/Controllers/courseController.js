const Course=require("../modals/courseModel");
const expressAsyncHandler = require("express-async-handler");


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
    displayCourse
};