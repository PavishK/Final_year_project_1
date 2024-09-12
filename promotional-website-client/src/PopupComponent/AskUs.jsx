import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BGImage from '../images/AskUs.svg';
import './PopupStyle.css';
import SuccessToaster from '../Form/SuccessToast';


const AskUs = () => {
  const [askDetails, setAskDetails] = useState({ question: '', desc: '', link: '' });
  const [isDrafted,setIsDrafted]=useState(false);
  const navigate=useNavigate();

  const handleChange = (e) => {
    setAskDetails({ ...askDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // localStorage.setItem('askDetails', JSON.stringify(askDetails));
    // console.log('Details saved to local storage:', askDetails);
  };

  const handleAskLater = (e) => {
    setIsDrafted(true);
    e.preventDefault();
    localStorage.setItem('askDetails', JSON.stringify(askDetails));
    console.log('Details saved to local storage:', askDetails);
    setAskDetails(false);
  };

  useEffect(() => {
    const savedDetails = JSON.parse(localStorage.getItem('askDetails'));
    if (savedDetails) {
      setAskDetails(savedDetails);
    }
  }, []);

  return (
    <div className="ask-us-container">
      <div className="ask-us-left-section">
        <div>
          <h1>Let's get started.</h1>
          <p>Ask your problem. We will get back to you with the best solution.</p>
          <img className="ask-us-popup-image" src={BGImage} alt="course" />
        </div>
      </div>
      <div className="ask-us-right-section">
        <form className="ask-us-form" onSubmit={handleSubmit}>
          <textarea
            className="ask-us-text-input"
            value={askDetails.question}
            name="question"
            placeholder="Type your question"
            rows="1"
            onChange={handleChange}
            required
          ></textarea>
          <textarea
            className="ask-us-text-input"
            value={askDetails.desc}
            name="desc"
            placeholder="Describe your problem"
            rows="3"
            onChange={handleChange}
            required
          ></textarea>
          <textarea
            className="ask-us-text-input"
            value={askDetails.link}
            name="link"
            placeholder="Add Google Drive folder link (make permission public)"
            rows="1"
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="ask-us-submit-button">Submit Question</button>
        </form>
        <p className="ask-later-link" onClick={handleAskLater}>Ask later</p>
      </div>
      {isDrafted?(<SuccessToaster key="201" message="Message saved in draft." />):null}
    </div>
  );
};

export default AskUs;
