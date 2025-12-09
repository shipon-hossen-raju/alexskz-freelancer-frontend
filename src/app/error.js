'use client' 
 
import { useEffect } from 'react'
import './globals.css';
import CustomContainer from '@/components/ui/CustomContainer';
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error)
  }, [error])
 
  return (
   <CustomContainer>
     <div className='text-center space-y-4 my-10'>
      <h2 className='text-red-600 font-semibold text-2xl md:text-4xl'>{error?.message || 'Something went wrong'}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className='cursor-pointer border border-gray-300 p-2 rounded-lg bg-gray-100'
      >
        Try again
      </button>
    </div>
   </CustomContainer>
  )
}