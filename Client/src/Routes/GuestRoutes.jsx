
import React from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from '../Guest/pages/Dashboard/Dashboard'
import Login from '../Guest/pages/Login/Login'
import Signup from '../Guest/pages/Signup/Signup'
import Companyreg from '../Guest/pages/Companyreg/Companyreg'
import About from '../Guest/pages/About/About'
import Blog from '../Guest/pages/Blog/Blog'
import Pricing from '../Guest/pages/Pricing/Pricing'
import Sectors from '../Guest/pages/Sectors/Sectors'





const GuestRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="Companyreg" element={<Companyreg/>}/>
        <Route path="About" element={<About />} />
        <Route path="Pricing" element={<Pricing />} />
        <Route path="Blog" element={<Blog />} />
        <Route path="Sectors" element={<Sectors />} />
    
      </Routes>
    </div>
  )
}

export default GuestRoutes
