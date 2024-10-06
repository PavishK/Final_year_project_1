const Course=require("../modals/courseModel");
const { EnrolledCourses } = require('../modals/enrolledCourseModel');
const User = require("../modals/userModel");
const expressAsyncHandler = require("express-async-handler");



const countUsersCoursesAndEnrolled=expressAsyncHandler(async(req,res)=>{

    console.log("fetched Count by ADMIN");
    try{
        const usercount=await User.countDocuments();
        const coursecount=await Course.countDocuments();
        const enrolledcount=await EnrolledCourses.countDocuments();

        return res.status(200).json({mesasge:"Count fetched!",data:{usercount:usercount,coursecount:coursecount,enrolledcount:enrolledcount}});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});


const allUsersData=expressAsyncHandler(async(req,res)=>{
    console.log("User data fetched by ADMIN");
    try{
        const users=await User.find();
        if(!users){
            return res.status(404).json({message:"No users found"});
        }
        return res.status(200).json({message:"User data fetched!",data:users});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

const findIdAndUpdatePassword = expressAsyncHandler(async (req, res) => {
    console.log("Updated ID -> ", req.params.id);
    const { newPassword ,isadmin, name, email} = req.body;

    if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name=name;
        user.email=email;
        user.password = newPassword;
        user.isadmin=isadmin;
        await user.save();

        res.status(200).json({ message: `User ${user.name}'s data updated!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});


const deleteUserById=expressAsyncHandler(async(req,res)=>{
    console.log("User ID to delete -> ", req.params.id);
    try{
        const user=await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
            }
                return res.status(200).json({message:"User deleted!"});
            }catch(err){
                res.status(500).json({message:err.message});
            }

});

const findCourseAndUpdate=expressAsyncHandler(async(req,res)=>{
    console.log("Updated course ID -> ",req.params.id);
    const {name, desc, cost, coursesrc, available}=req.body;
    try{
        const course=await Course.findById(req.params.id);
        if(!course){
            return res.status(404).json({message:"Course not found"});
            }
            course.name=name;
            course.desc=desc;
            course.cost=cost;
            course.coursesrc=coursesrc;
            course.available=available;
            await course.save();
            res.status(200).json({message:"Course updated!"});
            }catch(err){
                res.status(500).json({message:err.message});
            }
});

const addCourse=expressAsyncHandler(async(req, res) => {
    console.log("Course data to add -> ", req.body);
    try {
        const courses = req.body;
        await Course.insertMany(courses);
        res.status(200).send('Courses added successfully!');
        console.log("Course Added successfully!");
    } catch (error) {
        res.status(500).send('Error adding courses');
    }
});

const deleteCourse=expressAsyncHandler(async(req,res)=>{
    console.log("Course ID to delete -> ", req.params.id);
    try{
        const course=await Course.findByIdAndDelete(req.params.id);
        if(!course){
            return res.status(404).json({message:"Course not found"});
            }   
            return res.status(200).json({message:"Course deleted!"});
    }catch(err){
                res.status(500).json({message:err.message});
    }
})


module.exports={
    countUsersCoursesAndEnrolled,
    allUsersData,
    findIdAndUpdatePassword,
    deleteUserById,
    findCourseAndUpdate,
    addCourse,
    deleteCourse
};