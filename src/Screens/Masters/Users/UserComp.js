import React from 'react'
import { Outlet } from 'react-router-dom'

const UserComp = () => {
  return (
    <div>
      <Outlet/>  
    </div>
  )
}

export default UserComp