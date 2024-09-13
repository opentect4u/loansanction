import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthBr() {
    console.log('auth')

  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default AuthBr
