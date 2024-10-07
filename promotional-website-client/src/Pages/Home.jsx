import React, { useRef, useState, useEffect, useCallback } from 'react';
import './styledPage.css';
import Logo from '../assets/Main-Logo.png';
import User from '../assets/student.svg';
import { useNavigate, Outlet, NavLink, useLocation } from 'react-router-dom';
import { Login as LoginIcon, Logout as LogoutIcon, Edit as EditIcon, Done as DoneIcon } from '@mui/icons-material';
import { FaBars, FaTimes } from 'react-icons/fa';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, Button, useMediaQuery, useTheme } from '@mui/material';
import LottieAnimation from './LottieAnimation'; // Lottie animation component
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const navRef = useRef();
  const subMenuRef = useRef(null);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      setIsAdmin(userData.data?.isadmin || false);
    }
  }, [userData]);

  useEffect(() => {
    const restrictedPaths = ['/course', '/service'];
    if (restrictedPaths.includes(location.pathname) && !isLoggedIn) {
      setShowLoginPopup(true);
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
  }, [location.pathname, isLoggedIn]);

  const showNavbar = useCallback(() => {
    if (navRef.current) {
      navRef.current.classList.toggle('responsive_nav');
    }
  }, []);

  const toggleMenu = useCallback(() => {
    if (subMenuRef.current) {
      subMenuRef.current.classList.toggle('open-menu');
    }
  }, []);

  const handleLogout = useCallback(
    (e) => {
      e.stopPropagation();
      localStorage.clear();
      setIsLoggedIn(false);
      navigate('/form');
    },
    [navigate]
  );

  const closeLoginPopup = useCallback(() => {
    setShowLoginPopup(false);
    navigate('/');
  }, [navigate]);

  const onClose=(e)=>{
    e.stopPropagation();
    toggleMenu()
  }

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress />
      </Backdrop>

      <header className="hero">
        <div className="logo-container">
          <h3 className="logo-mindisplay">TRAINING TRAINS</h3>
          <img src={Logo} alt="Logo" className="home-logo" />
        </div>

        <nav className="navbar" id="navcontainer" ref={navRef}>
          <NavLink to="/" className="page-link">Home</NavLink>
          <NavLink to="/course" className="page-link">Course</NavLink>
          <NavLink to="/service" className="page-link">Product & Service</NavLink>
          <NavLink to="/contact" className="page-link">Contact</NavLink>

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>

          {isLoggedIn ? (
            <div className="user-initial" onClick={toggleMenu}>
              {userData.data?.name?.charAt(0).toUpperCase()}
            </div>
          ) : (
            <img src={User} alt="User" className="home-user" onClick={toggleMenu} />
          )}

          {isLoggedIn ? (
            <div className="sub-menu-wrap" id="subMenu" ref={subMenuRef} onClick={onClose}>
              <div className="sub-menu">
                <div className="user-info">
                  <div className="user-initial">{userData.data?.name?.charAt(0).toUpperCase()}</div>
                  <h2>&nbsp;{userData.data?.name}</h2>
                </div>
                <hr />
                {isAdmin && (
                  <div className="sub-menu-link" onClick={() => navigate('/admin')}>
                    <AdminPanelSettingsIcon />
                    <p>Admin Panel</p>
                    <span>{'>'}</span>
                  </div>
                )}
                <div className="sub-menu-link" onClick={() => navigate('/edit-profile')}>
                  <EditIcon />
                  <p>Edit Profile</p>
                  <span>{'>'}</span>
                </div>
                <div className="sub-menu-link" onClick={() => navigate('/enrolled-courses')}>
                  <DoneIcon />
                  <p>Enrolled Courses</p>
                  <span>{'>'}</span>
                </div>
                <div className="sub-menu-link" onClick={handleLogout}>
                  <LogoutIcon />
                  <p>Logout</p>
                  <span>{'>'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="sub-menu-wrap" id="subMenu" ref={subMenuRef}>
              <div className="sub-menu">
                <hr />
                <div className="sub-menu-link" onClick={() => navigate('/form')}>
                  <LoginIcon />
                  <p>Login</p>
                  <span>{'>'}</span>
                </div>
              </div>
            </div>
          )}
        </nav>

        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>

      <div className="Outlet">
        <Outlet />
      </div>

      <Dialog
        open={showLoginPopup}
        onClose={closeLoginPopup}
        fullWidth
        maxWidth={isMobile ? 'xs' : 'sm'}
      >
        <DialogContent>
          <div style={{ textAlign: 'center' }}>
            <LottieAnimation />
            <h3>Please log in to view this page</h3>
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={() => navigate('/form')} variant="contained" color="primary">
            Login
          </Button>
          <Button onClick={closeLoginPopup} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Home;
