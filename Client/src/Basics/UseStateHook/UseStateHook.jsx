import React, { useState } from 'react'

const UseStateHook = () => {
    const[name, setName]=useState("Anu")
  return (
   
    <div> {name}
         <div>

            <button onClick = {() => setName("Anuhh")}>Change Name</button>

            </div>
            
         </div>
        
        
        
  )
}

export default UseStateHook