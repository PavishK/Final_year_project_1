import React, { useState, useEffect } from 'react';
import './PopupStyle.css';  
import Toaster from '../Form/Toaster';
import SuccessToaster from '../Form/SuccessToast';
import PaymentOption from './PaymentOption';

function CourseEnrollment({ data}) {
  const [nextBtn, setNextBtn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phno: "",
    chosenCourse: data.name,
  });
  
  const [draftStatus, setDraftStatus] = useState({ status: false, msg: "" });
  const [errorMessage, setErrorMessage] = useState({ show: false, msg: "" });
  const [toastKey, setToastKey] = useState(Date.now()); // Key to force re-render

  
  useEffect(() => {
    const savedData = localStorage.getItem("EnrollementData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      parsedData.chosenCourse=data.name;
      setFormData(parsedData);
      setDraftStatus({ status: true, msg: "Data loaded from draft." });
      setToastKey(Date.now()); // Update key to force re-render of toast
      setTimeout(() => setDraftStatus({ status: false, msg: "" }), 2000); // Hide toaster after 2 seconds
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setNextBtn(true);  // Set nextBtn to true to proceed to the next step
  };

  const SaveAsDraft = () => {
    localStorage.setItem("EnrollementData", JSON.stringify(formData));
    setDraftStatus({ status: true, msg: "Data saved as draft." });
    setToastKey(Date.now()); // Update key to force re-render of toast
    setTimeout(() => setDraftStatus({ status: false, msg: "" }), 2000); // Hide toaster after 2 seconds
  };

  const requireData = (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name || !formData.email || !formData.phno || !formData.chosenCourse) {
      setErrorMessage({ show: true, msg: "Fill the requirements!" });
      setToastKey(Date.now()); // Update key to force re-render of error toast
    } else if (!regex.test(formData.name)) {
      setErrorMessage({ show: true, msg: "Name contains only letters." });
      setToastKey(Date.now()); // Update key to force re-render of error toast
    } else if (!emailRegex.test(formData.email)) {
      setErrorMessage({ show: true, msg: "Invalid Email format." });
      setToastKey(Date.now()); // Update key to force re-render of error toast
    } else if (!phoneRegex.test(formData.phno)) {
      setErrorMessage({ show: true, msg: "Invalid Phone Number format." });
      setToastKey(Date.now());
    } else {
      setErrorMessage({ show: false, msg: "" });
      handleSubmit(e); // Properly call handleSubmit
    }
  };

  return (
    <>
      {!nextBtn ? (
        <div className="courseenrollment-container">
          <form className="courseenrollment-form">
            <h2>Checkout</h2>

            <label className='label-course-item' htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            /><br />

            <label className='label-course-item' htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            /><br />

            <label className='label-course-item' htmlFor="phno">Phone Number</label>
            <input
              type="tel"
              id="phno"
              value={formData.phno}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            /><br />

            <label className='label-course-item' htmlFor="chosenCourse">Chosen Course</label>
            <input
              type="text"
              id="chosenCourse"
              value={formData.chosenCourse}
              onChange={handleChange}
              required
            /><br />

            <div className="courseenrollment-buttons">
              <button type="button" className="btn-dismiss" onClick={SaveAsDraft}>Save as Draft</button>
              <button type="submit" onClick={requireData} className="btn-submit">Next</button>
            </div>
          </form>
          {errorMessage.show && <Toaster key={toastKey} message={errorMessage.msg} />}
          {draftStatus.status && <SuccessToaster key={toastKey} message={draftStatus.msg} />}
        </div>
      ) : (
        <PaymentOption handleBack={() => setNextBtn(false)} data={data}/>
      )}
    </>
  );
}

export default CourseEnrollment;
