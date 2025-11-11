import CustomContainer from '@/components/ui/CustomContainer'
import Link from 'next/link'
 
export default function NotFound() {
  return (
   <CustomContainer>
     <div className='text-center space-y-6 my-10 border'>
      <h2 className='!text-red-600 font-semibold text-2xl md:text-4xl'>Not Found</h2>
      <p className='text-gray-700'>Could not find requested resource</p>
      <Link href="/" className='!border !border-gray-300 !p-2 !rounded-lg !bg-gray-100'>Return Home</Link>
    </div>
   </CustomContainer>
  )
}
