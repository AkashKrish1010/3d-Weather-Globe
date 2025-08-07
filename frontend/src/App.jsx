import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute.jsx'; 


const App = () => {
  return (
    <>
    
    <Routes>
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </>
  );
};

export default App;
