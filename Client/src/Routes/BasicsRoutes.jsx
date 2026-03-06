import React from 'react'
import UseStateHook from '../Basics/UseStateHook/UseStateHook'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import Counter from '../Basics/UseStateHook/Counter'
import RegisterList from '../Basics/UseStateHook/RegisterList'
 import UseEffectHook from '../Basics/UseEffectHook/UseEffectHook'
const BasicsRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="UseStateHook" element={<UseStateHook />} />
        <Route path="counter" element={<Counter />} />
        <Route path="register" element={<RegisterList />} />
        <Route path="UseEffectHook" element={<UseEffectHook/>} />
      </Routes>

    </div>
  )
}

export default BasicsRoutes