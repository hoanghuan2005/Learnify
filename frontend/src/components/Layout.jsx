import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({ showSidebar = false, children }) => {
  return (
    <div className='min-h-screen'>
        <div className='flex'>
            {/* SIDEBAR */}
            {showSidebar && <Sidebar />}

            {/* NAVBAR */}
            <div className='flex-1 flex flex-col'>
                <Navbar />
                {/* MAIN CONTENT */}
                <main className='flex-1 overflow-y-auto'>
                    {children}
                </main>
            </div>
        </div>
    </div>
  )
}

export default Layout