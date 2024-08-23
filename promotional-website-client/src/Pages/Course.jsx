import React from 'react';
import './styledPage.css';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CourseList from '../images/course_img/CourseList';
import CourseBook from './CourseBook';
import { useNavigate } from 'react-router-dom';

function Course() {
  const navigate=useNavigate(null);
  const SelectCourse = (item) => {
    localStorage.setItem("CourseData",JSON.stringify(item));
    navigate('/course-book',{state:item});
    
  };

  return (
    <>
      <div className="course-container">
        {CourseList.map((course) => (
          <div className="course-item" key={course.id}>
            <div className="courses">
              <img src={course.src} alt='none' />
            </div>
            <div className="courses">
              <div className="right-item-container">
                <h3>{course.name}</h3>
                <span className='cost-item'>{course.cost}</span>  
              </div>
              <p className='description-text'>{course.desc}</p>
              <div className="enroll-container">
                <p className='enrolled-item'><span className='enrolled-count'>{course.enrolled}</span> Enrolled</p>
                <button onClick={() => SelectCourse(course)}>Enroll Now <NorthEastIcon sx={{fontSize:'medium'}}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Course;
