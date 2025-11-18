import React from 'react'

export default function CustomContainer({ children }) {
  return (
    <div className='container mx-auto pt-10 pb-10 lg:pb-20 px-4 min-h-[80vh]'>
        {children}
    </div>
  )
}
