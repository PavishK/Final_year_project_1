import React from 'react';
import './styledPage.css';
import TrainingLogo from '../images/WelcomePageImg.png';
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate=useNavigate(null);
  return (
    <>
        <div className="welcome-container">
        <div className="welcome-item1">
            <p>A training institute</p>
            <h1>There Is Always<br/>A Way To Learn More</h1>
        </div>
        <div className="welcome-item2">
            <p>Unlock your potential and explore creativity like never before.<br/>
            Discover the new you with our software training programs!</p>
            <button onClick={()=>navigate('/course')}>Get Started</button>
        </div>
        </div>
        <div className="image-home-container">
        <img src={TrainingLogo} alt='Training Trains'/>
        </div>
        
    </>
  )
}

export default Welcome