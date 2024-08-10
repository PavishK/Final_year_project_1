import React from 'react';
import './styledPage.css';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { IconButton } from '@mui/material';
import CourseList from '../images/course_img/CourseList';

function Course() {
  console.log(CourseList)
  return (
    <>
    <div className="course-container">
    {CourseList.map((course,key)=>(
      
      <div className="course-item">
        <div className="courses">
            <img src={course.src} alt='none'/>
        </div>
        <div className="courses">
        <div className="right-item-container">
        <h3>{course.name}</h3>
        <span className='cost-item'>{course.cost}</span>  
        </div>
        <p className='description-text'>{course.desc}</p>
        <div className="enroll-container">
        <p className='enrolled-item'><span className='enrolled-count'>{course.enrolled}</span> Enrolled</p>
        <button>Enroll Now <IconButton><NorthEastIcon sx={{fontSize:'medium'}}/></IconButton></button>
        </div>
        </div>
      </div>
    ))};
    </div>
    </>
  )
}

export default Course