import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//Styles & Images
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './formStyles.css';

import Google from './images/google-logo.svg';
import Apple from './images/apple-logo.svg';



function Login() {

  const navigate=useNavigate();

  const notify = () =>toast.success('Login Successful! 😎', {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    transition: Slide,
    });

    const notifyError=(msg)=>toast.error(msg, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Slide,
      });

  const [data,setData]=useState({name:"",password:""});

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setData({...data,[name]:value});
  }




  const display=async()=>{

   
    console.log(data);
    try{
    const config={
      header:{
        'Coneten-Type':'application/json',
      },
    };

    const res=await axios.post("http://localhost:8080/login",data,config);
    notify(); 
    // navigator('/login');
  }catch(err){
    console.log("Axios Error -> ",err.message);
    notifyError("Invalid username or password!");
  }
  }

  const ValidateData=(e)=>{
    e.preventDefault();
    if(!data.name || !data.password){
      notifyError("Fill the requiremenst!");
    }
    else if(data.password.length<6){
      notifyError("Password length minimum 6");
    }
    else{
      display();
    //   window.setTimeout(navigate('/'),2000)
    }

  }



  return (
    <>    <div>
      <div className='login-container'>
        <div className='login-item'>
          <div className='item'>
          <label>Username</label><br></br>
            <input type='text' placeholder='Username' className='login-input' name='name' value={data.name} onChange={handleChange} required /><br></br>
            <label>Password</label><br></br>
            <input type='password' placeholder='Password' className='login-input' name='password' value={data.password} onChange={handleChange} required/><br></br>
           <center><button className='login-btn' onClick={ValidateData}>Login</button></center>
           <p className='goto-page'>Don't have an account? <u onClick={()=>navigate('/register')}>register</u></p>
           <div className="image-container">
            <img src={Google} alt='Google'/>
            <img src={Apple} alt='Google'/>
           </div> 
          </div>
        </div>
        </div>
      </div>
    <ToastContainer
        position="top-right"
        autoClose={4000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"/>

    </>


  )
}

export default Login