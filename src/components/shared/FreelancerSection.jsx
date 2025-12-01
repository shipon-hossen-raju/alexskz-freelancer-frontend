import React from 'react'
import SectionContainer from './SectionContainer'
import p1 from '@/assets/image/freelancer.jpg';
import FreelancerCard from '../Home/FreelancerCard';
import { Carousel } from 'antd';
import CustomCarousel from './CustomCarousel';
import { useGetTopRatedProfessionalQuery } from '@/redux/api/publicApi';





export default function FreelancerSection({ heading }) {
        const {data, isLoading, isError, error} = useGetTopRatedProfessionalQuery();
    if(isLoading){
        return <div>Loading...</div>
    }
    const pros = data?.data || [];
    if(isError || pros.length === 0){
        return <div>No Professionals Found</div>
    }

    return (
        <div>
            <SectionContainer heading={heading} title="Professional">
                
               
               <CustomCarousel items={pros} />

            </SectionContainer>
        </div>
    )
}
