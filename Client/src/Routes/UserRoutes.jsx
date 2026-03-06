import React from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from '../User/Pages/Dashboard/Dashboard'
import MyProfile from '../User/Pages/MyProfile/MyProfile'
import Editprofile from '../User/Pages/Editprofile/Editprofile'
import Changepassword from '../User/Pages/Changepassword/Changepassword'
import Category from '../User/Pages/Category/Category'
import ViewMarkets from '../User/Pages/ViewMarkets/ViewMarkets'
import Viewcompany from '../User/Pages/Viewcompany/Viewcompany'
import Settings from '../User/Pages/Settings/Settings'

const UserRoutes = () => {
  return (
    <div>
    
      <Routes>
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="MyProfile" element={<MyProfile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="Editprofile" element={<Editprofile />} />
        <Route path="ChangePassword" element={<Changepassword />} />
        <Route path="Category" element={<Category />} />
        <Route path="ViewMarkets" element={<ViewMarkets />} />
        <Route path="Viewcompany" element={<Viewcompany />} />
  
      </Routes>
    </div>
  )
}

export default UserRoutes
