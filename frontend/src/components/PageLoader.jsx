import React from 'react'

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen" data-theme="forest">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-green-500"></div>
    </div>
  )
}

export default PageLoader