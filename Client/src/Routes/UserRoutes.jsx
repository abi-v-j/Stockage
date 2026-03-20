import React from 'react'
import { Route, Routes } from 'react-router'
import MyProfile from '../User/Pages/MyProfile/MyProfile'
import Editprofile from '../User/Pages/Editprofile/Editprofile'
import Changepassword from '../User/Pages/Changepassword/Changepassword'
import ViewMarkets from '../User/Pages/ViewMarkets/ViewMarkets'
import Viewcompany from '../User/Pages/Viewcompany/Viewcompany'
import Settings from '../User/Pages/Settings/Settings'
import ViewStocks from '../User/Pages/ViewStocks/ViewStocks'
import UserDash from '../User/Pages/UserDash/UserDash'

const UserRoutes = () => {
  return (
    <div>
    
      <Routes>
        <Route path="" element={<UserDash />} />
        <Route path="MyProfile" element={<MyProfile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="Editprofile" element={<Editprofile />} />
        <Route path="ChangePassword" element={<Changepassword />} />
        <Route path="ViewMarkets" element={<ViewMarkets />} />
        <Route path="Viewcompany" element={<Viewcompany />} />
        <Route path="ViewStock/:id" element={<ViewStocks />} />
  
      </Routes>
    </div>
  )
}

export default UserRoutes
