import React, { useState, useEffect } from 'react';
import './PopupStyle.css';
import AskUs from './AskUs';
import CourseEnrollment from './CourseEnrollment';
import CloseIcon from '@mui/icons-material/Close';

const PopupMessage = ({ message, data, onClose }) => {
  const [visibleContent, setVisibleContent] = useState(null);

  useEffect(() => {
    if (message === "askus") {
      setVisibleContent(<AskUs onClose={onClose} />);
    } else if (message === "coursebook") {
      setVisibleContent(<CourseEnrollment data={data} onClose={onClose} />);
    } else {
      setVisibleContent(null);
    }
  }, [message, onClose, data]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
        {visibleContent}
      </div>
    </div>
  );
};

export default PopupMessage;
