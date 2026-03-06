import React from 'react'
import { useState } from 'react'
import Styles from './RegisterList.module.css'
const RegisterList = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  console.log(name, email, password, phone);



  return (
    <div>
      <div>
        <div className={Styles.mainContainer}>
          <div className={Styles.container}>

            <div className={Styles.subcontainer}>
              <div className={Styles.titleContainer}>
                <div className={Styles.title}>Register Here</div>
              </div>
              <input type="text" placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} className={Styles.inp} />
              <input type="text" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} className={Styles.inp} />


              <input type="text" className={Styles.inp} placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />

              <div className={Styles.btnContainer}>

                <input type="text" placeholder='Enter Your Phone' onChange={(e) => setPhone(e.target.value)} className={Styles.inp} />

              </div>

              <button className={Styles.btn} >Register</button>


            </div>

          </div>
          <div className={Styles.container}>

            <div className={Styles.subcontainer}>
              <div className={Styles.titleContainer}>
                <div className={Styles.title}>Register Here</div>
              </div>
              <div className={Styles.inp1}>

                <div > Name:</div>{name}<br />

                <div>Email:</div>{email}<br />

                <div> Password:</div>{password}<br />

                <div> Phone:</div>{phone}<br />

               
              </div>


            </div>

          </div>
        </div>




      </div>


    </div>
  )
}

export default RegisterList