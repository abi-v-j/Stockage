import React, { useEffect } from 'react'
import { useState } from 'react';
import Styles from './UseEffectHook.module.css'

const UseEffectHook = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  useEffect(() => {
    // alert("welcome");
    // confirm("r ur sure?")
    setName(prompt("enter your name"))
    setEmail(prompt("enter your Email"))
    setPassword(prompt("enter your password"))
    setPhone(prompt("enter your phone"))
  }, [])
  console.log(name, email, password, phone);
  return (
    <div>
      <div className={Styles.mainContainer}>
        
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


   
  )
}

export default UseEffectHook