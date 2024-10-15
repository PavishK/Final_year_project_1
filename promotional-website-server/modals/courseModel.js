const  mongoose= require('mongoose');

const courseSchema = new mongoose.Schema({
    id: Number,
    src: String,
    name: String,
    cost: String,
    available: Boolean,
    desc: String,
    coursesrc: String,
    enrolledcount: { type: Number, default: 0 },
  });

const Course = mongoose.model('Course', courseSchema);
module.exports=Course;