
import React, {useState } from 'react'

const Counter = () => {
    const[count, setCount]=useState(0)
  return (
   
    <div> 
         <div>
<input type="button" value="Increment" onClick={()=>{setCount(count+1)}}/>
<div>{count}</div>
            </div>
            
         </div>
        
        
        
  )
}

export default Counter