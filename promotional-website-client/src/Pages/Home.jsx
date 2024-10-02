import React, { useRef, useState, useEffect } from 'react';
import './styledPage.css';
import Logo from '../assets/Main-Logo.png';
import User from '../assets/student.svg';
import { useNavigate, Outlet, NavLink, useLocation } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { FaBars, FaTimes } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import Footer from './Footer';
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, Button } from '@mui/material';

// Import Lottie Animation
import LottieAnimation from './LottieAnimation'; // Your Lottie component

import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [showLoginPopup, setShowLoginPopup] = useState(false); 
  const navigate = useNavigate();
  const navRef = useRef();
  const subMenuRef = useRef(null);
  const location = useLocation(); 

  const userData = JSON.parse(localStorage.getItem('userData')) || {};

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 800,
      easing: 'ease-out-cubic',
    });

    if (userData && (userData.status === 200 || userData.status === 201)) {
      setIsLoggedIn(true);
    }
  }, [userData]);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(true); 
      setTimeout(() => {
        setIsLoading(false); 
      }, 1000); 
    };

    handleRouteChange();
  }, [location]);

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  const toggleMenu = () => {
    if (subMenuRef.current) {
      subMenuRef.current.classList.toggle('open-menu');
    }
  };

  const LogoutHandler = (e) => {
    e.stopPropagation();
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    navigate('/form');
  };

  const handleCourseClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate('/course');
    } else {
      setShowLoginPopup(true); 
    }
  };

  const handleProductServiceClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate('/service');
    } else {
      setShowLoginPopup(true);
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate('/contact');
    } else {
      setShowLoginPopup(true);
    }
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress />
      </Backdrop>

      <header className='hero'>
        <div className='logo-container'>
          <h3 className='logo-mindisplay'>TRAINING TRAINS</h3>
          <img src={Logo} alt='Logo' className='home-logo' />
        </div>

        <nav className='navbar' id='navcontainer' ref={navRef}>
          <NavLink to='/' className='page-link'>
            Home
          </NavLink>
          <NavLink to='/course' className='page-link' onClick={handleCourseClick}>
            Course
          </NavLink>
          <NavLink to='/service' className='page-link' onClick={handleProductServiceClick}>
            Product & Service
          </NavLink>
          <NavLink to='/contact' className='page-link' onClick={handleContactClick}>
            Contact
          </NavLink>
          <button className='nav-btn nav-close-btn' onClick={showNavbar}>
            <FaTimes />
          </button>
          {isLoggedIn ? (
            <div className='user-initial' onClick={toggleMenu}>
              {userData.data?.name?.charAt(0).toUpperCase()}
            </div>
          ) : (
            <img src={User} alt='User' className='home-user' onClick={toggleMenu} />
          )}

          {isLoggedIn ? (
            <div className='sub-menu-wrap' id='subMenu' ref={subMenuRef}>
              <div className='sub-menu'>
                <div className='user-info'>
                  <div className='user-initial'>{userData.data?.name?.charAt(0).toUpperCase()}</div>
                  &nbsp;&nbsp;
                  <h2>{userData.data.name}</h2>
                </div>
                <hr />
                <div className='sub-menu-link'>
                  <EditIcon />
                  <p onClick={() => navigate('/edit-profile')}>Edit Profile</p>
                  <span>{'>'}</span>
                </div>
                <div className='sub-menu-link'>
                  <DoneIcon />
                  <p onClick={() => navigate("/enrolled-courses")}>Enrolled Courses</p>
                  <span>{'>'}</span>
                </div>
                <div className='sub-menu-link'>
                  <LogoutIcon />
                  <p onClick={LogoutHandler}>Logout</p>
                  <span>{'>'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className='sub-menu-wrap' id='subMenu' ref={subMenuRef}>
              <div className='sub-menu'>
                <hr />
                <div className='sub-menu-link' onClick={() => navigate('/form')}>
                  <LoginIcon />
                  <p>Login</p>
                  <span>{'>'}</span>
                </div>
              </div>
            </div>
          )}
        </nav>

        <button className='nav-btn' onClick={showNavbar}>
          <FaBars />
        </button>
      </header>

      <div className='Outlet'>
        <Outlet />
      </div>

      <Dialog open={showLoginPopup} onClose={closeLoginPopup}>
        <DialogContent>
          <LottieAnimation /> 
          <h3 style={{ textAlign: 'center' }}>Please log in to view this page</h3>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/form')}>Login</Button>
          <Button onClick={closeLoginPopup}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Home;
