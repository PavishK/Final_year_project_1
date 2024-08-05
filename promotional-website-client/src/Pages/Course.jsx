import React from 'react';
import './styledPage.css';
import DataScience from '../images/Datascience.png';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { IconButton } from '@mui/material';

function Course() {
  return (
    <>
      <div className="course-container">
      <div className="course-item">
        <div className="courses">
            <img src={DataScience} alt='none'/>
        </div>
        <div className="courses">
        <div className="right-item-container">
        <h3>Data Science<br/> With Python</h3>
        <span className='const-item'>₹500/month</span>  
        </div>
        <p>useful for beginners</p>
        <div className="enroll-container">
        <p className='enrolled-item'><span className='enrolled-count'>?</span> Enrolled</p>
        <button>Enroll Now <IconButton><NorthEastIcon sx={{fontSize:'medium'}}/></IconButton></button>
        </div>
        </div>
      </div>

      </div>
    </>
  )
}

export default Course