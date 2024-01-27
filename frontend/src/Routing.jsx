import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './Components/Signin'
import Signup from './Components/Signup'
import Dashborad from './Components/Dashborad'
import Home from './Components/Home'

const Routing = () => {
  return (
  
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashborad />} />
        </Routes>
        </BrowserRouter>
  
  )
}

export default Routing