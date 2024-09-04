import React from 'react'
import { Outlet } from 'react-router-dom'

function ClientComp() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default ClientComp
