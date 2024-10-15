const { EnrolledCourses } = require('../modals/enrolledCourseModel');
const expressAsyncHandler = require("express-async-handler");

const addEnrolledCourse = expressAsyncHandler(async (req, res) => {
  const dateObj = new Date();
  const newDate = `${dateObj.getUTCDate()}/${dateObj.getUTCMonth() + 1}/${dateObj.getUTCFullYear()}`;

  try {
    const { name, coursename, imgsrc, coursecost, paymenttype } = req.body;
    let user = await EnrolledCourses.findOne({ name });

    if (user) {
      ['coursename', 'enrolledon', 'coursecost', 'paymenttype', 'imgsrc'].forEach(field => {
        user[field] = Array.isArray(user[field]) ? user[field] : [user[field]];
      });
      user.coursename.push(coursename);
      user.enrolledon.push(newDate);
      user.coursecost.push(coursecost);
      user.paymenttype.push(paymenttype);
      user.imgsrc.push(imgsrc);

      await user.save();
      return res.status(200).json({ message: 'Course added to existing user', user });
    }
    const newUser = new EnrolledCourses({
      name,
      coursename: [coursename],
      imgsrc: [imgsrc], 
      enrolledon: [newDate],
      coursecost: [coursecost],
      paymenttype: [paymenttype],
    });

    await newUser.save();
    return res.status(201).json({ message: 'New user enrolled', user: newUser });

  } catch (error) {
    console.error('Error adding course:', error.message || error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

const displayEnrolledCourse = expressAsyncHandler(async (req, res) => {
  try {
    const enrolled = await EnrolledCourses.findOne({name:req.params.name});
    if (!enrolled) {
      return res.status(201).json({ message: "Course not found" });
    }
    return res.status(200).json(enrolled);
  } catch (error) {
    console.error('Error fetching course:', error.message || error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { addEnrolledCourse, displayEnrolledCourse };
