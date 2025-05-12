// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../src/pages/Home';
import Register from '../src/pages/Registration';
import Login  from './pages/Login';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
