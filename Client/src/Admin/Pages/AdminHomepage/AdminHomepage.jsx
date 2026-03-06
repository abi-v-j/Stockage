import React from 'react'
import Styles from './AdminHomepage.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import AdminRoutes from '../../../Routes/AdminRoutes'

const AdminHomepage = () => {
  return (
    <div className={Styles.root}>
      {/* Sidebar */}
      <aside className={Styles.sidebarSlot}>
        <Sidebar />
      </aside>

      {/* Main column */}
      <div className={Styles.mainCol}>
        {/* Navbar */}
        <header className={Styles.navbarSlot}>
          <Navbar />
        </header>

        {/* Page content */}
        <main className={Styles.content}>
          {/* Subtle grid overlay */}
          <div className={Styles.gridOverlay} aria-hidden="true" />

          <div className={Styles.pageInner}>
            <AdminRoutes />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminHomepage