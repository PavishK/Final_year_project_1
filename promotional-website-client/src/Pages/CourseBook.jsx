import React, { useEffect, useState } from 'react'
import './styledPage.css'
import LanguageIcon from '@mui/icons-material/Language';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Box, Typography } from '@mui/material';
import WWYLearn from '../CourseInfoComponents/WhatWillYouLearn';
import CContent from '../CourseInfoComponents/CourseContent';
import Instructors from '../CourseInfoComponents/Instructors';
import { useLocation } from 'react-router-dom';
import PopupMessage from '../PopupComponent/PopupMessage';

const IconWithName = ({ icon: IconComponent, name }) => {

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <IconComponent fontSize="small" />
      <Typography variant="caption" style={{fontSize:"15px",padding:'5px',marginLeft:'3px'}}>{name}</Typography>
    </Box>
  );
};

function CourseBook() {
  const [isInfoSelected,setInfoSelected]=useState({item1:true,item2:false,item3:false});
  const [Data,setData]=useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const location=useLocation();

  useEffect(() => {
    if(location.pathname==="/course-book"){
      setData(location.state.name);
      console.log(location.state);
    }
    }, [location]);
    const togglePopup = () => {
      setPopupVisible(!isPopupVisible);
    };

  

  return (<>
  <div className="whole-course-deatils-container">

<div className="course-card">
    <img src={location.state.coursesrc} alt="Course Image"/>
    <div className="course-card-content">
        <h2 className="course-title">{Data}</h2>
        <p className="course-info">
            {location.state.desc}
        </p>
        <div className="course-rating">
            <span>⭐ 4.4 (?? ratings)</span>
        </div>
        <div className='icon-container'>
          <IconWithName icon={LanguageIcon} name='English,Tamil'/>
          <IconWithName icon={DateRangeIcon} name='? Months'/>
        </div>
        <h3>{location.state.cost}</h3>
        <center><button onClick={togglePopup}>Enroll now</button></center>
    </div>

</div>
    <div className="coursemoredetails">
      <p className={isInfoSelected.item1?'course-details-selection-option':'coursemoredetailsoption '} onClick={()=>setInfoSelected({item1:true,item2:false,item3:false})}>What you will learn</p>
      <p className={isInfoSelected.item2?'course-details-selection-option':'coursemoredetailsoption '} onClick={()=>setInfoSelected({item1:false,item2:true,item3:false})}>Course content</p>
      <p className={isInfoSelected.item3?'course-details-selection-option':'coursemoredetailsoption '} onClick={()=>setInfoSelected({item1:false,item2:false,item3:true})}>Trainer Profile</p>
     </div>
     <div className='hr-container'></div>
     <div className="list-content-container">
     <div className={isInfoSelected.item1?'list-content-container-item':'course-content-container'}><WWYLearn/></div>
     <div className={isInfoSelected.item2?'list-content-container-item':'course-content-container'}><CContent/></div>
     <div className={isInfoSelected.item3?'list-content-container-item':'course-content-container'}><Instructors/></div>
     </div>
</div>
  {isPopupVisible && (
        <PopupMessage message="coursebook" data={location.state} onClose={togglePopup} />
      )}

     {/* <center><div className='coursebook-container'>
     <div className="courseitem">
      <img src={Image} alt='Course Photo' style={{width:'60%',height:'60%'}}/>
     </div>
     <div className="courseitem">
      <div className="coursedetails">
        <h1>Data Science With Python</h1>
        <p>Transform data into insights and boost your career with Python Data Science.</p>
        <text>Created by <span>Training Trains</span></text>
        <div className='icon-container'>
          <IconWithName icon={LanguageIcon} name='English, Tamil'/>
          <IconWithName icon={DateRangeIcon} name='? Months'/>
          <IconWithName icon={AutoStoriesIcon} name='Theory & Practical'/>
        </div>
        <button>Enroll now</button>
      </div>
     </div>
     </div>
     <div className="coursemoredetails">
      <p>What you will learn</p>
      <p>Course content</p>
      <p>Instructors</p>
     </div>
     <hr/>
     </center> */}
  </>
   
  )
}

export default CourseBook