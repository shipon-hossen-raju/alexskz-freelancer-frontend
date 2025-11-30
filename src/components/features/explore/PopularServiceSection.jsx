import SectionContainer from '@/components/shared/SectionContainer'
import React from 'react'

import img1 from '@/assets/image/popularService.jpg';
import PopularServiceCard from './PopularServiceCard';
import { useGetPopularServicesQuery } from '@/redux/api/serviceApi';




export default function PopularServiceSection() {
  const { data: popularServices, isLoading, isError } = useGetPopularServicesQuery();
  if (isLoading) {
    return <div>Loading Popular Services...</div>
  }

  const services = popularServices?.data?.result || [];

  // console.log('popular: ', services)

  if (isError || services.length === 0) {
    return <div>No Popular Service found</div>
  }
  return (
    <div>
      <SectionContainer heading="Popular Services" title="Services">

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {services.map((s) => (
            <PopularServiceCard key={s.id} service={s} />
          ))}
        </div>


      </SectionContainer>
    </div>
  )
}
