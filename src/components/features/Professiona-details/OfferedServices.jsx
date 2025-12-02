import SubHeadingBlack from '@/components/ui/SubHeadingBlack'
import React from 'react'
import img from '@/assets/image/popularService.jpg'
import OfferedServicesCard from '@/components/shared/OfferedServicesCard'
import ScheduleSection from './ScheduleSection'


export default function OfferedServices({services, availability}) {
  return (
    <div>
        <div className='mb-10'>
            <SubHeadingBlack text="Offered Services"/>
        </div>

        {/* content */}
        <div className='flex flex-col xl:flex-row gap-10'>
        {/* <div className='flex flex-col  gap-10'> */}
            {/* left side */}
            <div className='space-y-8 xl:w-3/5 '>
            {/* <div className='space-y-8  '> */}
                {
                    services.map((service) => (
                        <OfferedServicesCard service={service}/>
                    ))
                }
            </div>

            {/* right side */}
            <div className='xl:w-2/5   '>
            {/* <div className='   '> */}
                <ScheduleSection availability={availability}/>
            </div>
        </div>
    </div>
  )
}
