import React,{useEffect} from 'react';
import './styledPage.css';
import TrainingLogo from '../images/WelcomePageImg.png';
import { useNavigate } from 'react-router-dom';
import Page2Image from '../images/home-page-20img.svg';
import Page3Image from '../images/welcome-page-3-img.svg';
import Footer from './Footer';

//Animation  
import AOS from "aos";
import "aos/dist/aos.css";

function Welcome() {
    const navigate=useNavigate(null);

    useEffect(() => {
      AOS.init({
        once: true,
        disable: "phone",
        duration: 750,
        easing: "ease-out-cubic",
      });
    }, []);
    
    
  return (
    <>
        <div className="welcome-container">
        <div  className="welcome-item1">
            <p>A training institute</p>
            <h1>There Is Always<br/>A Way To Learn More</h1>
        </div>
        <div  className="welcome-item2">
            <p>Unlock your potential and explore creativity like never before.<br/>
            Discover the new you with our software training programs!</p>
            <button onClick={()=>navigate('/course')}>Get Started</button>
        </div>
        </div>
        <div  className="image-home-container">
        <img src={TrainingLogo} alt='Training Trains'/>
        </div>

        <div data-aos="fade-up" className="welcome-container-page-two">
        <h2>Why you should choose Training Trains?</h2>
        <p className='para-2'>TrainingTrains offers a team of experienced developers proficient in the 
        latest technologies, ensuring innovative and high-quality software solutions. We focus on understanding and exceeding customer expectations by delivering tailored, performance-driven software. In addition to development, we provide digital marketing and social media strategies to boost your brand's visibility and reach. By staying ahead with the newest technology trends, we deliver reliable,
         scalable solutions that set your business up for future success.</p>
        </div>
        <div className="welcome-home-page-two-item">
          <img data-aos="fade-down-right" src={Page2Image} alt='Why Choose?'/>
          <ul data-aos="fade-down-left">
            <li>We offer continuous support and maintenance to help you refine and expand your skills.</li>
            <li>Our solutions ensure your skills stay current and aligned with evolving industry trends.</li>
            <li>We provide tailored guidance to help you sharpen your abilities for long-term success.</li>
            <li>Regular updates and resources keep you prepared for the ever-changing demands of the tech landscape.</li>
          </ul>
        </div>

        <div className="welcome-product-container">
        <div data-aos="fade-right" className="welcome-product-item">
            <p>Learn with creation</p>
            <h1>We build beautiful<br/>products, faster.</h1>
            <h4>Products that suitable for every platform.</h4>
            <button onClick={()=>navigate('/service')}>Our products</button>
        </div>
        <div data-aos="fade-left" className="welcome-product-item2">
        <img src={Page3Image} alt='Product'/>
        </div>
        </div>  
        <Footer/>   
    </>
  )
}

export default Welcome