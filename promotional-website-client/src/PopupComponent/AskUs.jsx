import React from 'react';
import BGImage from '../images/AskUs.svg';
import './PopupStyle.css';

const AskUs = () => {
  return (
    <div className="ask-us-container">
      <div className="ask-us-left-section">
        <div>
          <h1>Let's get started.</h1>
          <p>Ask your problem. We will get back to you with the best solution.</p>
          <img className='ask-us-popup-image' src={BGImage} alt='course image'/>
        </div>
      </div>
      <div className="ask-us-right-section">
        <form className="ask-us-form">
          <textarea className="ask-us-text-input" placeholder="Type your question" rows="1"></textarea>
          <textarea className="ask-us-text-input" placeholder="Describe your problem" rows="3"></textarea>
          <textarea className="ask-us-text-input" placeholder="Add Google Drive folder link (make permission public)" rows="1"></textarea>
          <button className="ask-us-submit-button" disabled>Submit Question</button>
        </form>
        <a className="ask-later-link" href="#!">Ask later</a>
      </div>
    </div>
  );
};

export default AskUs;
