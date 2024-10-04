import React, { useState, useEffect } from 'react';
import './styledPage.css';
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageEnrolledCourses = () => {
  const [courses, setCourses] = useState(null); // State to hold course data
  const [loading, setLoading] = useState(true); // State to control loader
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const username = JSON.parse(localStorage.getItem('userData')).data.name;
        const res = await axios.get(`http://localhost:8080/courses/enrolled-courses/${username}`);
        setCourses(res.data); // Set course data
        setLoading(false); // Turn off loading
      } catch (err) {
        console.log(err.response);
        setLoading(false); // Turn off loading in case of error
      }
    };
    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return (
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <div className="manage-enrolled-courses">
      <div className="profile-title-container">
        <IconButton onClick={() => navigate('/')}>
          <KeyboardBackspaceIcon />
        </IconButton>
        <h2>Enrolled Courses</h2>
      </div>

      <div className="manage-enrolled-course-list">
        {/* Check if courses exist and map over the arrays */}
        {courses && courses.coursename.length > 0 ? (
          courses.coursename.map((courseName, index) => (
            <div key={index} className="manage-enrolled-course-item">
            <img
                src={courses.imgsrc && courses.imgsrc[index] ? courses.imgsrc[index] : "default.jpg"}  // Fallback to a default image
                alt={courseName}
                className="enrolled-course-image"
            />

              <div className="manage-enrolled-course-details">
                <h3>{courseName}</h3>
                <p>Enrolled on: {courses.enrolledon[index]}</p>
                <p>Course Cost: ₹{courses.coursecost[index]}</p>
                <p>Payment Type: {courses.paymenttype[index]}</p>
              </div>
              <button disabled className="manage-enrolled-continue-btn">Enrolled</button>
            </div>
          ))
        ) : (
          <p>No courses enrolled yet!</p>
        )}
      </div>
    </div>
  );
};

export default ManageEnrolledCourses;
