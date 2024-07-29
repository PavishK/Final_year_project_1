import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './formStyles.css';

import Google from './images/google-logo.svg';
import Apple from './images/apple-logo.svg';

function Registeration() {
  const navigate=useNavigate();

  const notifySuccess = () =>toast.success('Account created Successful! 😎', {
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

  // const navigator=useNavigate();
  const [data,setData]=useState({name:'',email:'',password:''});
  const [pass,setPass]=useState('');

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

    const res=await axios.post("http://localhost:8080/register",data,config);
    console.log(res);
    notifySuccess();
    // navigator('/login');
  }catch(err){
    console.log("Axios Error -> ",err.message);
    notifyError("Username or Email already exixt.");
  }

  }

  const validateData=(e)=>{
    e.preventDefault();

    if(!data.name || !data.email || !data.password || !pass){
     notifyError("Fill the requirements!");
    }
    else if(data.password!=pass){
      notifyError("Miss-match password!");
    }
    else if(data.password.length<6){
      notifyError("Password length size must be greater than 6")
    }
    else{
      display();

    }
  }

 
  return (
    <div>
    <div className='register-container'>
      <div className='register-item'>
        <div className='item'>
        <label>Username</label><br></br>
          <input type='text' placeholder='Username' className='register-input' name='name' value={data.name} onChange={handleChange} required/><br></br>
          <label>E-mail</label><br></br>
          <input type='email' placeholder='example@gmail.com' className='register-input' name='email' value={data.email} onChange={handleChange} required Validate /><br></br>
          <label>Password</label><br></br>
          <input type='password' placeholder='Password' className='register-input' name='password' value={data.password} onChange={handleChange} required/><br></br>
          <label>Confirm password</label><br></br>
          <input type='password' placeholder='Confirm password' className='register-input' name='password' value={pass} onChange={(e)=>setPass(e.target.value)} required /><br></br>
          <center><button className='register-btn' onClick={validateData}>Register</button></center>
          <p className='register-goto-page'>Already have an account? <u onClick={()=>navigate('/')}>login</u></p>
          <div className="register-image-container">
            <img src={Google} alt='Google'/>
            <img src={Apple} alt='Google'/>
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
  </div>
  )
}

export default Registeration