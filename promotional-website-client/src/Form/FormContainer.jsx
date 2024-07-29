import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import FormLayer from './FormLayer';
import Login from './Login';
import Register from './Register';



function FormContainer() {
  return (
   <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<FormLayer/>} >
    <Route  index  element={<Login/>} />
    <Route path='register' element={<Register/>} />
    </Route>
    </Routes>
    </BrowserRouter>
   </>
    
  )
}

export default FormContainer