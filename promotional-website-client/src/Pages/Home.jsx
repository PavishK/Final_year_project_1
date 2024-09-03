import React from 'react';
import './styledPage.css';
import Logo from '../assets/Main-Logo.png';
import User from '../assets/student.svg';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EditIcon from '@mui/icons-material/Edit';
import { SetMealRounded } from '@mui/icons-material';
import {Link,Outlet,NavLink} from 'react-router-dom'
import Welcome from './Welcome';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { IconButton } from '@mui/material';
import { FaBars, FaTimes } from "react-icons/fa";
import Footer from './Footer';


function Home() {

  const [isTouched,setIsTouched]=useState({home:true,course:false,product:false,service:false,contact:false});
  const [isLoggetIn,setIsLoggedIn]=useState(false);
  const navigate=useNavigate();
  const userData=JSON.parse(localStorage.getItem("userData"));
  const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

  
  const toggleMenu=()=>{
    let subMenu= window.document.getElementById("subMenu");
    subMenu.classList.toggle("open-menu"); 
    setIsLoggedIn(userData.status===200 ||userData.status===201 ?true:false);
  }

  const LogoutHandler=()=>{
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    navigate("/form");
  }
  return (
    <>
    <header className='hero'>
    <div className="logo-conatiner">
    <h3 className='logo-mindisplay'>TRAINING TRAINS</h3>
    <img src={Logo} alt='Logo' className='home-logo'/>
    </div>
    
			<nav className='navbar' id='navcontainer' ref={navRef}>
				<NavLink to='/' className='page-link'>Home</NavLink>
				<NavLink to='course' className='page-link'>Course</NavLink>
				<NavLink to='product' className='page-link'>Product & Service</NavLink>
				{/* <NavLink to='service' className='page-link'>Service</NavLink> */}
				<NavLink to='contact' className='page-link'>Contact</NavLink>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>

        <img src={User} alt='Logo' className='home-user' onClick={toggleMenu}/>
    {isLoggetIn?(
    <div className="sub-menu-wrap" id='subMenu'>
      <div className="sub-menu">
        <div className="user-info">
          <img src={User} alt='user' className='home-user'/>
          <h2>{userData.data.name}</h2>
        </div>
        <hr/>

        <div className="sub-menu-link">
          <EditIcon/>
          <p>Edit Profile</p>
          <span> {">"} </span>
        </div>

        <div className="sub-menu-link">
          <HelpOutlineIcon/>
          <p>Edit Help & Support</p>
          <span> {">"} </span>
        </div>

        <div className="sub-menu-link" onClick={LogoutHandler}>
          <LogoutIcon/>
          <p>Logout</p>
          <span> {">"} </span>
        </div>

      </div>
    </div>
    ):(
      <div className="sub-menu-wrap" id='subMenu'>
      <div className="sub-menu">
        <hr/>
        <div className="sub-menu-link" onClick={()=>navigate("/form")}>
        <LoginIcon/>
          <p >Login</p>
          <span> {">"} </span>
        </div>
      </div>
    </div>
      )}
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
   <div className='Outlet'>
    <Outlet/>
   </div>
   <Footer/>
   </>
  )
}

export default Home