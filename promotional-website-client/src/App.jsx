import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './Form/Form';
import './App.css';
import Home from './Pages/Home';
import Welcome from './Pages/Welcome';
import Course from './Pages/Course';
import Product from './Pages/Product';
import Service from './Pages/Service';
import Contact from './Pages/Contact';
import CourseBook from './Pages/CourseBook';
import EditProfile from './Pages/EditProfile';
import EnrolledCourses from './Pages/EnrolledCourses';

/*-------------------------ADMIN---------------------------*/

import Dashboard from './AdminPages/Dashboard';
import ManageCourses from './AdminPages/ManageCourses';
import ManageUsers from './AdminPages/ManageUsers';
import Admin from './AdminPages/Admin';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Welcome />} />
          <Route path='/course' element={<Course />} />
          <Route path='/product' element={<Product />} />
          <Route path='/service' element={<Service />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/course-book' element={<CourseBook />} />
        </Route>
        <Route path="/form" element={<Login />} />
        <Route path="/coursebook" element={<CourseBook />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/enrolled-courses' element={<EnrolledCourses />} />
        
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manageuser" element={<ManageUsers />} />
          <Route path="managecourses" element={<ManageCourses />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
