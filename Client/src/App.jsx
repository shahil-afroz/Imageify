import { useContext, useState } from 'react'
import React from 'react';

  import { ToastContainer } from 'react-toastify';
  
import './App.css'
import Home from './pages/Home'
import Result from './pages/Result'
import Login from './components/Login'
import Navbar from './components/Navbar'
import BuyCredit from './pages/BuyCredit'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import { AppContext } from './context/AppContext'
function App() {
 const {showLogin}=useContext(AppContext)

  return (
    <>
      <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-[#232a34]'>
       <ToastContainer position="top-center" />
        <Navbar/>
      {showLogin&& <Login/>}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/result' element={<Result />} />
          <Route path='/buy' element={<BuyCredit />} />
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App
