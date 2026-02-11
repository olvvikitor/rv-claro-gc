import React from 'react'
import { Outlet } from 'react-router-dom'

import { Link } from 'react-router-dom'
function Layout() {
  return (
    <>
    <div className='min-h-screen'>
        <nav>
            <Link to={'operador'} >Operador</Link>
            <Link to={'/'} >Dashboard</Link>
        </nav>
        <Outlet/>
    </div>
    </>
    
  )
}

export default Layout