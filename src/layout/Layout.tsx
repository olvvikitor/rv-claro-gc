import React from 'react'
import { Outlet } from 'react-router-dom'

import { Link } from 'react-router-dom'
import Navbar from './Navbar'
function Layout() {
  return (
    <div className='min-h-screen bg-gray-100'>
        <Navbar/>
            <main className='p-6'>
            <Outlet/>
            </main>
    </div>
  )
}

export default Layout