import React from 'react'

export default function CustomContainer({ children }) {
  return (
    <div className='container mx-auto pt-30 lg:pt-40 pb-10 lg:pb-20 px-4 '>
        {children}
    </div>
  )
}
