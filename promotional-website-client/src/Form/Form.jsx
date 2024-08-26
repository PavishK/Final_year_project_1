import React, { useState } from "react";
import logo from "../assets/Main-Logo.png";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";
import './formStyles.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, IconButton, Snackbar } from "@mui/material";

function Login() {
  const [showlogin, setShowLogin] = useState(true);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [confirmPass,setConfirmPass]=React.useState("");
  const [loading, setLoading] = useState(false);

  const [logInStatus, setLogInStatus] = React.useState("");
  const [signInStatus, setSignInStatus] = React.useState("");

  const navigate = useNavigate();

  function handleClose(event, reason) {
    navigate("/");
    }


  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  /* --------------------------------------------------------------------------- */

  const loginHandler = async (e) => {
      if(data.name=="" || data.password==""){
        setLogInStatus({
          msg: "Need User name and Password",
          key: Math.random(),
        });
      }
      else{
    setLoading(true);
    // console.log(data);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8080/user/login/",
        data,
        config
      );
      console.log("Login status : ", response);
      setLogInStatus({ msg: "Success", key: Math.random() });
      setLoading(false);
   
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/");
    } catch (error) {
      setLogInStatus({
        msg: "Invalid User name or Password",
        key: Math.random(),
      });
    }
    setLoading(false);
  }
  };

  /*--------------------------------------------------------------------------------- */

  const signUpHandler = async () => {
    const regex=/^[a-zA-Z].*\d$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(data.name=="" || data.email=="" || data.password=="" || confirmPass==""){
      setSignInStatus({
        msg: "Fill the form",
        key: Math.random(),
      });
    }
    else if(data.password.length<8 || data.password.length>15){
      setSignInStatus({
        msg: "Password length must be  8 to 15",
        key: Math.random(),
      });
    }
    else if(data.password!==confirmPass){
      setSignInStatus({
        msg: "Password not match, try again!",
        key: Math.random(),
      });
    }
    else if(!emailRegex.test(data.email)){
      setSignInStatus({
        msg: "Invalid E-mail format!",
        key: Math.random(),
      });
    }
   
    else if(!regex.test(data.name)){
      setSignInStatus({
        msg: "Username must be letters followed by digits",
        key: Math.random(),
      });
      if(data.name.length<15){
        setSignInStatus({
          msg: "Username lengtn must below 15",
          key: Math.random(),
        });
      }
    }

    else{
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8080/user/register/",
        data,
        config
      );
      console.log(response);
      setSignInStatus({ msg: "Success", key: Math.random() });
      navigate("/");
      localStorage.setItem("userData", JSON.stringify(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.status === 405) {
        setSignInStatus({
          msg: "E-mail ID already Exists, Please re-login",
          key: Math.random(),
        });
      }
      if (error.response.status === 406) {
        setSignInStatus({
          msg: "User Name already Taken, Please take another one",
          key: Math.random(),
        });
      }
      setLoading(false);
    }
  }
  };

  /*-------------------------------------------------------------------------------------*/

  return (
    <>
    <div className="App">
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress />
      </Backdrop>

      <div className="login-container">
      <div className="close-form">
      <IconButton key="close" onClick={handleClose}>
          <ArrowBackIcon/>
          </IconButton>
      </div>
        <div className="image-container">
          <img src={logo} alt="Logo" className="welcome-logo" />
        </div>

        {showlogin && (
          <div className="login-box">
          <img src={logo} alt="Logo" className="welcome-logo-maxwidth" />
            <p className="login-text">Login.</p>
            
            <input type="text" className="styled-input"
              onChange={changeHandler}
              placeholder=" Username"
              name="name"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  loginHandler();
                }
              }}
            />

<input className="styled-input"
            placeholder=" Password"
              onChange={changeHandler}
              type="password"
              name="password"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  loginHandler();
                }
              }}
            />
            <center>
            <button className="styled-button" onClick={loginHandler}>Login</button>
            </center>
            <p className="style-navigate">
              Don't have an Account ?{" "}
              <span className="hyper"onClick={() => {setShowLogin(false);}}>signup</span>
            </p>
            {logInStatus ? (<Toaster key={logInStatus.key} message={logInStatus.msg} />) : null}
           </div>
        )}

{/*------------------------------------ Register---------------------------------- */}


        {!showlogin && (
          <div className="login-box">
          <img src={logo} alt="Logo" className="welcome-logo-maxwidth" />
            <p className="login-text">Register.</p>
            <input
              onChange={changeHandler}
              name="name"
              type="text"
              className="styled-input"
              placeholder="Username"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  signUpHandler();
                }
              }}
            />
            <input
              onChange={changeHandler}
              className="styled-input"
              type="email"
              placeholder="example@gmail.com"
              name="email"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  signUpHandler();
                }
              }}
            />
            <input
              onChange={changeHandler}
              type="password"
              className="styled-input"
              placeholder="Password"
              name="password"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  signUpHandler();
                }
              }}
            />

          <input
              type="password"
              className="styled-input"
              placeholder="Confirm Password"
              name="password"
              value={confirmPass}
              onChange={(e)=>setConfirmPass(e.target.value)}
            />
            <button className="styled-button" onClick={signUpHandler}>Sign Up</button>
            <p className="style-navigate">
              Already have an Account ?&nbsp;
              <span className="hyper" onClick={() => {setShowLogin(true);}}>signin</span>
            </p>
            {signInStatus ? (<Toaster key={signInStatus.key} message={signInStatus.msg} />) : null}
          </div>
        )}
      </div>
      </div>
    </>
  );
}

export default Login;
