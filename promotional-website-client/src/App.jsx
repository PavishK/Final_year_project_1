import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './Form/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App