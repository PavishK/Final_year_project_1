import React from 'react';
import { useState, useEffect } from 'react';
import './styledPage.css';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CourseList from '../images/course_img/CourseList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Backdrop, CircularProgress } from "@mui/material";
import Lottie from 'react-lottie';  // Importing Lottie for animation
import animationData from '../assets/PaperPlain_Offline.json';  // Path to your Lottie error animation
import Toaster from '../Form/Toaster';
import Footer from './Footer';

function Course() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const navigate = useNavigate(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try { 
        const response = await axios.get('http://localhost:8080/courses/list-courses');
        setCourses(response.data);
        console.log(response.data);
        setErrorLoading(false); 
      } catch (error) {
        setErrorLoading(true); // Set error to true if there's an error
        console.error('Error fetching courses:', error);
      }
      setIsLoading(false);
    };

    fetchCourses();
  }, []);

  const SelectCourse = (item) => {
    localStorage.setItem("CourseData", JSON.stringify(item));
    navigate('/course-book', { state: item });
  };

  // Lottie configuration for error animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress />
      </Backdrop>

      {!errorLoading ? (
        <>
        <div className="course-container">
          {courses.map((course, key) => (
            <div className="course-item" key={key}>
              <div className="courses">
                <img src={CourseList[key] || course.src} alt={course.name} />
              </div>
              <div className="courses">
                <div className="right-item-container">
                  <h3>{course.name}</h3>
                  <span className='cost-item'>{course.cost}</span>
                </div>
                <p className='description-text'>{course.desc}</p>
                <div className="enroll-container">
                  {!course.available ? (
                    <p className='enrolled-item'>Available</p>
                  ) : (
                    <p className='enrolled-item-notAvailable'>NotAvailable</p>
                  )}
                  {!course.available ? (
                    <button onClick={() => SelectCourse(course)}>Enroll Now <NorthEastIcon sx={{ fontSize: 'medium' }} /></button>
                  ) : (
                    <button disabled>Enroll Now <NorthEastIcon sx={{ fontSize: 'medium' }} /></button>
                  )}
                </div>
              </div>
            </div>
           
          ))}
        </div>
        </>
      ) : (
        <center><div className="error-container">
          <Lottie options={defaultOptions} height={400} width={400} />
          <Toaster key="201" message="Unable to load courses. Server Error" />
        </div></center>
      )}
    </>
  );
}

export default Course;
