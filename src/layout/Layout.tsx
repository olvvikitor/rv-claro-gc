import { Outlet } from 'react-router-dom'
import Header from './Header'
function Layout() {
  return (
    <div className='min-h-screen bg-gray-100 dark:bg-zinc-800 transition-all duration-500 ease-in-out '>
        <Header/>
            <main className='p-6'>
            <Outlet/>
            </main>
    </div>
  )
}

export default Layout