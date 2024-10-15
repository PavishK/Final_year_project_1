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
import Footer from './Footer';

import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

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

  return (
    <>
      <div className="whole-course-deatils-container">
        <div className="course-card">
          <img src={location.state.coursesrc} alt="Course Image"/>
          <div className="course-card-content">
            <h2 className="course-title">{Data}</h2>
            <p className="course-info">{location.state.desc}</p>
            <div className="course-rating">
              <span>⭐ 4.4 (?? ratings)</span>
            </div>
            <div className='icon-container'>
              <IconWithName icon={LanguageIcon} name='English,Tamil'/>
              <IconWithName icon={DateRangeIcon} name='6 Months'/>
            </div>
            <h3>{location.state.cost}</h3>
            <center><button onClick={togglePopup}>Enroll now</button></center>
          </div>
        </div>

        <div className="coursemoredetails">
          <p className={isInfoSelected.item1?'course-details-selection-option':'coursemoredetailsoption '} 
            onClick={() => setInfoSelected({item1:true,item2:false,item3:false})}>What you will learn</p>
          <p className={isInfoSelected.item2?'course-details-selection-option':'coursemoredetailsoption '} 
            onClick={() => setInfoSelected({item1:false,item2:true,item3:false})}>Course content</p>
          <p className={isInfoSelected.item3?'course-details-selection-option':'coursemoredetailsoption '} 
            onClick={() => setInfoSelected({item1:false,item2:false,item3:true})}>Trainer Profile</p>
        </div>
        
        <div className='hr-container'></div>
        <div className="list-content-container">
          <div className={isInfoSelected.item1?'list-content-container-item':'course-content-container'}><WWYLearn/></div>
          <div className={isInfoSelected.item2?'list-content-container-item':'course-content-container'}><CContent/></div>
          <div className={isInfoSelected.item3?'list-content-container-item':'course-content-container'}><Instructors/></div>
        </div>

        <div className='page-end-line'></div>

        <div className="course-booke-include">
          <h2>This course includes</h2><br/>
          <div className="course-container">
            <div className="course-item">
              <div className='icon-with-img'>
                <OndemandVideoIcon/>
                <p>On-demand video content</p>
              </div>
            </div>
            <div className="course-item">
              <div className='icon-with-img'>
                <CodeOffIcon/>
                <p>Coding and testing exercises</p>
              </div>
            </div>
            <div className="course-item">
              <div className='icon-with-img'>
                <MenuBookIcon/>
                <p>Practice and Read materials</p>
              </div>
            </div>
            <div className="course-item">
              <div className='icon-with-img'>
                <CloudDownloadIcon/>
                <p>Downloadable resources</p>
              </div>
            </div>
            <div className="course-item">
              <div className='icon-with-img'>
                <PhonelinkIcon/>
                <p>Access on mobile and TV</p>
              </div>
            </div>
            <div className="course-item">
              <div className='icon-with-img'>
                <EmojiEventsIcon/>
                <p>Certificate of completion</p>
              </div>
            </div>
          </div>

          <div className="course-booke-include">
            <h2>Requirements</h2><br/>
            <div className="course-container-requirements">
              <ul>
                <li>No prior programming experience required – we’ll teach you everything from scratch.</li>
                <li>Access to a computer or laptop is available during the course, or you can bring your own if preferred.</li>
                <li>No paid software needed – we use free tools and resources.</li>
                <li>Our instructors will guide you step-by-step on setting up the necessary software in class.</li>
              </ul>
            </div>
          </div>

          <div className="course-booke-include">
            <h2>Description</h2><br/>
            <div className='course-booke-include-description'>
              <p>Welcome to Training Trains, your ultimate destination for mastering {Data}. Our program caters to everyone, whether you're a complete beginner or looking to enhance your existing skills. Taught by experienced professionals, our frequently updated curriculum aligns with the latest industry trends and tools, ensuring you receive relevant education. Engage in hands-on projects designed to deepen your understanding and help you build a strong portfolio. 
              Many of our past students have successfully advanced their careers after completing our training. With its flexible and comprehensive approach, Training Trains is your complete guide to mastering {Data} and empowering you to achieve your goals with confidence.</p>
            </div>
          </div>
        </div>
      </div>
      
      {isPopupVisible && (
        <PopupMessage message="coursebook" data={location.state} onClose={togglePopup} />
      )}
      
      <Footer/>
    </>
  )
}

export default CourseBook;
