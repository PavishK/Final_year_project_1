import React, { useState, useEffect } from 'react';
import './styledPage.css';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CourseList from '../images/course_img/CourseList'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Backdrop, CircularProgress } from '@mui/material';
import Lottie from 'react-lottie';
import animationData from '../assets/PaperPlain_Offline.json'; // Ensure this path is correct
import Toaster from '../Form/Toaster'; // Ensure this path is correct
import DoneIcon from '@mui/icons-material/Done';
import Footer from './Footer';

function Course() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  // Fetch courses and enrolled courses
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setToastMessage(''); // Clear previous toast message
      try {
        const courseResponse = await axios.get('http://localhost:8080/courses/list-courses');
        setCourses(courseResponse.data);

        const username = JSON.parse(localStorage.getItem('userData')).data.name;
        const enrolledResponse = await axios.get(`http://localhost:8080/courses/enrolled-courses/${username}`);
        setEnrolledCourses(enrolledResponse.data.coursename || []);
        setErrorLoading(false);
      } catch (error) {
        setErrorLoading(true);
        setToastMessage('Unable to load courses.'); // Set toast message on error
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle course selection
  const handleSelectCourse = (course) => {
    localStorage.setItem('CourseData', JSON.stringify(course));
    navigate('/course-book', { state: course });
  };

  // Lottie configuration for error animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress />
      </Backdrop>

      {toastMessage && <Toaster key="201" message={toastMessage} />} {/* Display toast message if exists */}

      {!errorLoading ? (
        <div className="course-container">
          {courses.map((course, index) => (
            <div className="course-item" key={index}>
              <div className="courses">
                <img src={CourseList[index] || course.src} alt={course.name} />
              </div>
              <div className="courses">
                <div className="right-item-container">
                  <h3>{course.name}</h3>
                  <span className="cost-item">₹{course.cost}</span>
                </div>
                <p className="description-text">{course.desc}</p>
                <div className="enroll-container">
                  <p className={course.available ? 'enrolled-item' : 'enrolled-item-notAvailable'}>
                    {course.available ? 
                    (<span><span className='enrolled-count'>{course.enrolledcount}</span>Enrolled</span>)
                     : 'Not Available'}
                  </p>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {enrolledCourses.includes(course.name) ? (
                    <button disabled style={{ backgroundColor: 'green' }}>
                      Enrolled&nbsp;<DoneIcon sx={{ fontSize: 'medium' }} />
                    </button>
                  ) : course.available ? (
                    <button onClick={() => handleSelectCourse(course)}>
                      Enroll Now <NorthEastIcon sx={{ fontSize: 'medium' }} />
                    </button>
                  ) : (
                    <button disabled>
                      Enroll Now <NorthEastIcon sx={{ fontSize: 'medium' }} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <center>
          <div className="error-container">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </center>
      )}

      {!isLoading && <Footer />}
    </>
  );
}

export default Course;
