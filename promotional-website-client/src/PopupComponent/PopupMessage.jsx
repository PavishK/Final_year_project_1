import React from 'react';
import './PopupStyle.css';
import AskUs from './AskUs';
import CloseIcon from '@mui/icons-material/Close';

const PopupMessage = ({ onClose }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup-container" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}><CloseIcon/></button>
        <AskUs />
      </div>
    </div>
  );
};

export default PopupMessage;
