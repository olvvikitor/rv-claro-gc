import React from 'react'
import { Outlet } from 'react-router-dom'

import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Header from './Header'
function Layout() {
  return (
    <div className='min-h-screen bg-gray-100'>
        <Header/>
            <main className='p-6'>
            <Outlet/>
            </main>
    </div>
  )
}

export default Layout