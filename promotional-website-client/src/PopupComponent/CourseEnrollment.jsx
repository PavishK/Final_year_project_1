import React, { useState, useEffect } from 'react';
import './PopupStyle.css';  
import Toaster from '../Form/Toaster';
import SuccessToaster from '../Form/SuccessToast';
import PaymentOption from './PaymentOption';

function CourseEnrollment({ data, onClose,image }) {
  const [nextBtn, setNextBtn] = useState(false);

  // Make sure no fields are undefined; use '' as default
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phno: '',
    chosenCourse: data?.name || '',  // Ensure chosenCourse is never undefined
  });
  
  const [draftStatus, setDraftStatus] = useState({ status: false, msg: '' });
  const [errorMessage, setErrorMessage] = useState({ show: false, msg: '' });

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      const parsedData = JSON.parse(savedData).data;
      setFormData({
        name: parsedData.fullname || '',  // Ensure no undefined values
        email: parsedData.email || '',
        phno: parsedData.phno || '',
        chosenCourse: parsedData.chosenCourse || data?.name || '',  // Fallback to data.name
      });
      setDraftStatus({ status: true, msg: 'Data loaded from draft.' });
      setTimeout(() => setDraftStatus({ status: false, msg: '' }), 2000); // Hide toaster after 2 seconds
    }
  }, [data]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setNextBtn(true); // Set nextBtn to true to proceed to the next step
  };

  const validateForm = () => {
    const regex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name || !formData.email || !formData.phno || !formData.chosenCourse) {
      return "Fill the requirements!";
    }
    if (!regex.test(formData.name)) {
      return "Name contains only letters.";
    }
    if (!emailRegex.test(formData.email)) {
      return "Invalid Email format.";
    }
    if (!phoneRegex.test(formData.phno)) {
      return "Invalid Phone Number format.";
    }
    return null;
  };

  const requireData = (e) => {
    e.preventDefault();
    const validationMessage = validateForm();
    if (validationMessage) {
      setErrorMessage({ show: true, msg: validationMessage });
    } else {
      setErrorMessage({ show: false, msg: '' });
      handleSubmit(e); // Properly call handleSubmit
    }
  };

  return (
    <>
      {!nextBtn ? (
        <div className="courseenrollment-container">
          <form className="courseenrollment-form" onSubmit={requireData}>
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
              <button type="button" className="btn-dismiss" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-submit">Next</button>
            </div>
          </form>
          {errorMessage.show && <Toaster message={errorMessage.msg} />}
          {draftStatus.status && <SuccessToaster message={draftStatus.msg} />}
        </div>
      ) : (
        <PaymentOption handleBack={() => setNextBtn(false)} data={data} />
      )}
    </>
  );
}

export default CourseEnrollment;
