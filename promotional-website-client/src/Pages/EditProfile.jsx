import React, { useEffect, useState } from 'react';
import './styledPage.css';
import axios from 'axios';
import Toaster from '../Form/Toaster';
import SuccessToast from '../Form/SuccessToast';
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import UpdatePassword from './UpdatePassword';
import { useNavigate } from 'react-router-dom';

const locations = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", 
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", 
  "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", 
  "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", 
  "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", 
  "Thanjavur", "Theni", "Thoothukudi (Tuticorin)", "Tiruchirappalli", 
  "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", 
  "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", 
  "Virudhunagar"
];

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: '',
    location: '',
    phno: '',
    fullname:''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [id, setId] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); // 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate=useNavigate(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData?.data?._id) {
          setIsLoading(true);
          try {
            const response = await axios.get(`http://localhost:8080/user/get-user-info/${parsedData.data._id}`);
            setUserData(response.data);
            setId(response.data._id);
          } catch (error) {
            console.error("Error fetching user data:", error);
          } finally {
            setIsLoading(false);
          }
        }
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
        setToastType('');
      }, 3000); 
  
      return () => clearTimeout(timer);
    }
  }, [toastMessage, toastType]);



  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email);
    const isValidPhone = /^[0-9]{10}$/.test(userData.phno);
    const isFullNameValid = userData.fullname.trim().length > 0;
    const isAddressValid = userData.address.trim().length > 0;
  
    if (!isValidEmail) {
      setToastMessage("Invalid email format.");
      setToastType('error');
      return;
    }
    
    if (!isValidPhone) {
      setToastMessage("Phone number must be 10 digits.");
      setToastType('error');
      return;
    }
  
    if (!isFullNameValid) {
      setToastMessage("Full name cannot be empty.");
      setToastType('error');
      return;
    }
  
    if (!isAddressValid) {
      setToastMessage("Address cannot be empty.");
      setToastType('error');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await axios.put(`http://localhost:8080/user/update-profile/${id}`, userData);
      localStorage.setItem('userData', JSON.stringify({data:response.data.data,status:response.status}));
      console.log(response.data.data);
      setToastMessage("Profile updated successfully.");
      setToastType('success');
    } catch (error) {
      console.error("Error updating profile:", error);
      setToastMessage("Error updating profile.");
      setToastType('error');
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'location') {
      const filteredSuggestions = locations.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (location) => {
    setUserData((prevData) => ({
      ...prevData,
      location,
    }));
    setSuggestions([]);
  };

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading || isSubmitting}>
        <CircularProgress />
      </Backdrop>

      <div className="whole-edit-profile-container">

      <form onSubmit={handleProfileUpdate}>
        <div className="profile-container">
          <div className="profile-title-container"><IconButton onClick={()=>navigate('/')}><KeyboardBackspaceIcon/></IconButton><h2>Edit profile</h2></div>
          <div className="profile-item">
            <label className="label">Full name</label>
            <input
              type="text"
              name="fullname"
              value={userData.fullname}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="profile-item">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="profile-item">
            <label className="label">Phone number</label>
            <input
              type="text"
              name="phno"
              placeholder="Enter your phone number"
              value={userData.phno}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="profile-item">
            <label className="label">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              value={userData.location}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((location, index) => (
                <div 
                  key={index} 
                  className="suggestion-item" 
                  onClick={() => handleSuggestionClick(location)}
                >
                  {location}
                </div>
              ))}
            </div>
          )}

          <div className="profile-item">
            <label className="label">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={userData.address}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="profile-item">
            <label className="label">User name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              disabled
              className="input-field"
            />
          </div>

          <button className="save-btn" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      {toastMessage && (
        toastType === 'success' ? (
          <SuccessToast message={toastMessage} />
        ) : (
          <Toaster message={toastMessage} />
        )
      )}
      <UpdatePassword/>
      </div>
    </>
  );
};

export default EditProfile;



// import React, { useEffect, useState } from 'react';
// import './styledPage.css';
// import axios from 'axios';
// import Toaster from '../Form/Toaster';
// import SuccessToast from '../Form/SuccessToast';
// import UpdatePassword from './UpdatePassword';
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// import { IconButton } from '@mui/material';

// const locations = [
//   "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", 
//   "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", 
//   "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", 
//   "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", 
//   "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", 
//   "Thanjavur", "Theni", "Thoothukudi (Tuticorin)", "Tiruchirappalli", 
//   "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", 
//   "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", 
//   "Virudhunagar"
// ];

// function EditProfile() {
  // const [userData, setUserData] = useState({
  //   name: '',
  //   email: '',
  //   address: '',
  //   location: '', 
  //   phno: '',
  // });
  
  // const [suggestions, setSuggestions] = useState([]);
  // const [id, setId] = useState('');
  // const [toastMessage, setToastMessage] = useState('');
  // const [toastType, setToastType] = useState(''); // 'success' or 'error'

  // useEffect(() => {
  //   const data = localStorage.getItem('userData');
  //   if (data) {
  //     const parsedData = JSON.parse(data);
  //     if (parsedData && parsedData.data) {
  //       const fetchData=async(key)=>{
  //         try{
  //           const res=await axios.get(`http://localhost:8080/user/get-user-info/${key}`);
  //           console.log(res);
  //           setUserData(res.data);
  //           setId(res.data._id);
  //         }
  //         catch(err){
  //           console.log(err.response);
  //         }
  //       }
  //       fetchData(parsedData.data._id);
        

  //     }

  //   }
  // }, []);

  // const handleProfileUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.put(`http://localhost:8080/user/update-profile/${id}`, userData);
  //     console.log(res.data);
  //     localStorage.setItem('userData',JSON.stringify(res.data.data));
  //     setToastMessage("Profile updated successfully.");
  //     setToastType('success');
      
  //   } catch (err) {
  //     console.log(err);
  //     setToastMessage("Error in updating profile.");
  //     setToastType('error');
  //   }
  // };
  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));

  //   if (name === 'location') {
  //     const filteredSuggestions = locations.filter(location =>
  //       location.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setSuggestions(filteredSuggestions);
  //   }
  // };

  // const handleSuggestionClick = (location) => {
  //   setUserData((prevData) => ({
  //     ...prevData,
  //     location: location,
  //   }));
  //   setSuggestions([]);
  // };

//   return (
//     <>
//       <div className="profile-container">
//         <div className="form-section">
//           <div className='form-iop-title'><IconButton><KeyboardBackspaceIcon/></IconButton><h2>Edit Profile</h2></div>
//           <form onSubmit={handleProfileUpdate}>
//             <div className="form-group">
//               <label htmlFor="name">Your Name</label>


//               <input
                // type="text"
                // name="name"
                // value={userData.name || ''}
                // onChange={handleChange}
                // required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="location">Location</label>
//               <input
                // type="text"
                // id="location"
                // name="location"
                // placeholder="Enter your location"
                // value={userData.location || ''}
                // onChange={handleChange}
                // required
//               />
              // {suggestions.length > 0 && (
              //   <div className="suggestions-dropdown">
              //     {suggestions.map((location, index) => (
              //       <div 
              //         key={index} 
              //         className="suggestion-item" 
              //         onClick={() => handleSuggestionClick(location)}
              //       >
              //         {location}
              //       </div>
              //     ))}
              //   </div>
              // )}
//             </div>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
                // type="email"
                // id="email"
                // name="email"
                // placeholder="Enter your email"
                // value={userData.email || ''}
                // onChange={handleChange}
                // required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="phone">Phone</label>
//               <input
                // type="text"
                // id="phone"
                // name="phno"
                // placeholder="Enter your phone number"
                // value={userData.phno || ''}
                // onChange={handleChange}
                // required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="address">Address</label>
//               <input
                // type="text"
                // id="address"
                // name="address"
                // placeholder="Enter your address"
                // value={userData.address || ''}
                // onChange={handleChange}
                // required
//               />
//             </div>
//             <button type="submit">Update Profile</button>
//           </form>
//         </div>

//         <div className="form-section">
//          <UpdatePassword id={id}/>
//       </div>
//     </div>

      // {toastMessage && (
      //   toastType === 'success' ? (
      //     <SuccessToast key="toast" message={toastMessage} />
      //   ) : (
      //     <Toaster key="toast" message={toastMessage} />
      //   )
      // )}
//     </>
//   );
// }

// export default EditProfile;

