import React from 'react'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import Dashboard from '../Admin/Pages/Dashboard/Dashboard'
import Category from '../Admin/Pages/Category/Category'
import Viewcompany from '../Admin/Pages/Viewcompany/Viewcompany'
import Wallet from '../Admin/Pages/Wallet/Wallet'
import Reports from '../Admin/Pages/Reports/Reports'
import AddCompany from '../Admin/Pages/AddCompany/AddCompany'
import Viewstock from '../Admin/Pages/Viewstock/Viewstock'
import Addstock from '../Admin/Pages/Addstock/Addstock'
import Accounts from '../Admin/Pages/Accounts/Accounts'
import VerifyCompany from '../Admin/Pages/VerifyCompany/VerifyCompany'



const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="Category" element={<Category />} />
        <Route path="Viewcompany" element={<Viewcompany />} />
        <Route path="Viewstock" element={<Viewstock />} />
        <Route path="AddCompany" element={<AddCompany />} />
        <Route path="Addstock" element={<Addstock />} />
        <Route path="Reports" element={<Reports />} />
        <Route path="Wallet" element={<Wallet />} />
        <Route path="Accounts" element={<Accounts />} />
        <Route path="verifyCompany" element={<VerifyCompany />} />
        
      </Routes>
    </div>
  )
}

export default AdminRoutes