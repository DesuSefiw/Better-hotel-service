// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../src/pages/Home';
import Register from '../src/pages/Registration';
import Login  from './pages/Login';
import Dashboard from './components/Dashboard';
import { HelmetProvider } from 'react-helmet-async';
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>

    </HelmetProvider>
    
  );
}

export default App;
