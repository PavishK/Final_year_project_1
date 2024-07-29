import React, { useState } from 'react';
import { Link,Outlet } from 'react-router-dom';
import './formStyles.css';

function FormLayer() {
  const [isTouched,setIsTouched]=useState({signin:true,signup:false});
  const Signin=()=>{
    setIsTouched({signin:true,signup:false})
  }
  const Signup=()=>{
    setIsTouched({signin:false,signup:true})
  }
  return (
    <div>
        <div className="form-container">
        <div className="form-item"><Link className={ isTouched.signin? 'active-touch':'signin-link'} onClick={Signin}  to='/'> Sign In</Link></div>
        <div className="form-item"><Link className={ isTouched.signup? 'active-touch':'signin-link'} onClick={Signup} to='/register'>Sign Up</Link> </div>
        </div>

        <Outlet/>
    </div>
  )
}

export default FormLayer