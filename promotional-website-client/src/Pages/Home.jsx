import React from 'react';
import './styledPage.css';
import Logo from '../assets/Main-Logo.png';
import User from '../assets/student.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EditIcon from '@mui/icons-material/Edit';
import { SetMealRounded } from '@mui/icons-material';
import {Link,Outlet,NavLink} from 'react-router-dom'
import Welcome from './Welcome';


function Home() {

  const [isTouched,setIsTouched]=useState({home:true,course:false,product:false,service:false,contact:false});
  const [isLoggetIn,setIsLoggedIn]=useState(false);
  const navigate=useNavigate();
  const userData=JSON.parse(localStorage.getItem("userData"));

  
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
   <div className="hero">
   <nav >
    <img src={Logo} alt='Logo' className='home-logo'/>
    <ul id='navbar'>
      <li><NavLink className='page-link' to='/'>Home</NavLink></li>
      <li><NavLink className='page-link' to='course'>Course</NavLink></li>
      <li><NavLink className='page-link' to='product'>Product</NavLink></li>
      <li><NavLink className='page-link' to='service'>Service</NavLink></li>
      <li><NavLink className='page-link' to='contact'>Contact</NavLink></li>
    </ul>
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
   </div>
   <div className='Outlet'>
    <Outlet/>
   </div>
   </>
  )
}

export default Home