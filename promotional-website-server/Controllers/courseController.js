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

const updateEnrolledCount = expressAsyncHandler(async (req, res) => {
    console.log("Course Id -> ", req.params.id);
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            { $inc: { enrolledcount: 1 } },
            { new: true } // This ensures you get the updated document
        );
        
        if (course) {
            res.status(200).json({ message: "Count incremented to "+course.enrolledcount});
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports={
    displayCourse,
    updateEnrolledCount,
};