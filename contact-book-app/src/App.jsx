import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar'
import Login from './Pages/Login';
import Register from './Pages/Register';
import { useAuth } from './context/AuthContext';
import "./App.css";
import Contacts from './Pages/Contact';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const {user} = useAuth()
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <ToastContainer position="top-right" autoClose={3000} />
    <Routes>
      <Route path='/' element={user ? <Contacts/> : <Navigate to ='/login'/>}/>
      <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
      <Route path='/register' element={!user ? <Register/> : <Navigate to='/'/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App