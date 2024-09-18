import React, { useState, useEffect } from 'react';
import './PopupStyle.css';
import AskUs from './AskUs';
import CourseEnrollment from './CourseEnrollment';
import CloseIcon from '@mui/icons-material/Close';

const PopupMessage = ({ message,data, onClose }) => {
  const [visibility, setVisibility] = useState({ askus: false, coursebook: false });

  useEffect(() => {
    if (message === "askus") {
      setVisibility({ askus: true, coursebook: false });
    } else if (message === "coursebook") {
      setVisibility({ askus: false, coursebook: true });
    } else {
      setVisibility({ askus: false, coursebook: false });
    }
  }, [message]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup-container" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
        {/* {visibility.askus && <AskUs />}
        {visibility.coursebook && <CourseEnrollment data={data}/>} */}
        <CourseEnrollment data={data}/>
      </div>
    </div>
  );
};

export default PopupMessage;
