const  mongoose= require('mongoose');

const courseSchema = new mongoose.Schema({
    id: Number,
    src: String,
    name: String,
    cost: String,
    available: Boolean,
    desc: String,
    coursesrc: String
  });

const Course = mongoose.model('Course', courseSchema);
module.exports=Course;