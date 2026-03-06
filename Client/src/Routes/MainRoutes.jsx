import React from 'react'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import AdminHomepage from '../Admin/Pages/AdminHomepage/AdminHomepage'
import Userhome from '../User/Pages/Userhome/Userhome'
import Guesthome from '../Guest/pages/Guesthome/Guesthome'

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="admin/*" element={<AdminHomepage />} />
        <Route path="/*" element={<Guesthome/>} />
        <Route path="Userhome/*" element={<Userhome />} />
      </Routes>

    </div>
  )
}

export default MainRoutes