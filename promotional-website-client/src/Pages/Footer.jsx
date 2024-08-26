import React from "react";
import "./styledPage.css";
import NorthIcon from '@mui/icons-material/North';
import { IconButton } from "@mui/material";
import Logo from '../assets/Main-Logo.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  return (<>
    <footer className="footer">
      <div className="footer-logo">
      <img src={Logo} alt="Training Trains"/>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li>Mission</li>
            <li>Team</li>
            <li>Newsletter</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>Contact</li>
            <li>Refund Policy</li>
            <li>FAQ's</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Social</h4>
          <ul>
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>
    </footer>
    <div className="footer-bottom">
        <p>Copyright © TrainingTrains</p>
        <p>Terms of Service</p>
        <p className="back-to-top" onClick={scrollToTop}>Back to top <NorthIcon fontSize="smaller"/></p>
      </div>
    </>
  );
};

export default Footer;
