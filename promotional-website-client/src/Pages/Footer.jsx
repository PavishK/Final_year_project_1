import React from "react";
import "./styledPage.css";
import NorthIcon from '@mui/icons-material/North';
import { IconButton } from "@mui/material";
import Logo from '../assets/Main-Logo.png';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate=useNavigate(null);
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
          <h4>Other platforms</h4>
          <ul>
            <li onClick={()=>window.open("https://domainhostly.com/","_blank")}>Domainhostly</li>
            <li onClick={()=>window.open("https://w3developers.com.np/","_blank")}>W3developers</li>
          </ul>
        </div>
        <div className="footer-column" onClick={()=>navigate("/contact")}>
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
            <li onClick={()=>window.open("https://www.instagram.com/training_trains/","_blank")}>Instagram</li>
            <li onClick={()=>window.open("https://www.linkedin.com/company/traing-trains-software-technology-institute","_blank")}>LinkedIn</li>
            <li onClick={()=>window.open("https://www.youtube.com/channel/UCQqG42FmqeFYRlTrRbMljVw","_blank")}>YouTube</li>
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
