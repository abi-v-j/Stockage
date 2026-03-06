import React from 'react'
import GuestRoutes from '../../../Routes/GuestRoutes'
import { Card } from '@mui/material'
import Styles from './Guesthome.module.css'
import Navbar from '../../components/Navbar/Navbar'



const Guesthome = () => {
  return (
    <div>
     <div className={Styles.grow}>
        <div><Navbar /></div>
        <Card className={Styles.container2}>
          <div><GuestRoutes /></div>
        </Card>
        
      </div>
      </div>
    




  )
}

export default Guesthome
