const mongoose=require('mongoose');

const EnrolledCourse=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    coursename:{
        type:Array,
        required:true,
    },
    enrolledon:{
        type:Array,
        require:true,
    },
    imgsrc:{
        type:Array,
        required:true,
    },
    coursecost:{
        type:Array,
        require:true,
    },
    paymenttype:{
        type:Array,
        required:true,
    }
});


const EnrolledCourses=mongoose.model('enrolled_courses',EnrolledCourse);

module.exports={EnrolledCourses};