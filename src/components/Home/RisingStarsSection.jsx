import React from 'react'

import p1 from '@/assets/image/freelancer.jpg';
import FreelancerCard from '../Home/FreelancerCard';
import SectionContainer from '../shared/SectionContainer';
import { useGetRisingStarsQuery } from '@/redux/api/publicApi';



// export const pros = [
//     { id: 1, imgSrc: p1, name: 'Mr. Lee', category: 'Finance & Accounting', rating: 4.5, reviews: 500 },
//     { id: 2, imgSrc: p1, name: 'Ava Kim', category: 'Marketing Strategy', rating: 4.8, reviews: 320 },
//     { id: 3, imgSrc: p1, name: 'Noah Diaz', category: 'UI/UX Design', rating: 4.6, reviews: 210 },
//     { id: 4, imgSrc: p1, name: 'Sara Ali', category: 'Web Development', rating: 4.7, reviews: 430 },
//     { id: 5, imgSrc: p1, name: 'Ken Ito', category: 'Data Analytics', rating: 4.9, reviews: 190 },
//     { id: 6, imgSrc: p1, name: 'Emma Roy', category: 'HR & Recruiting', rating: 4.4, reviews: 275 },
// ];


export default function RisingStarsSection({ heading, limit=4 }) {
    const {data, isLoading, isError, error} = useGetRisingStarsQuery();
    if(isLoading){
        return <div>Loading Rising Stars...</div>

    }

    const pros = data?.data || [];

    if(isError || pros.length === 0){
        return <div>No Rising Stars Found</div>
    }


    const items = pros.slice(0, limit);
    return (
        <div>
            <SectionContainer heading={heading} title="New comers">
                
               
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> {items.map((p) => ( <FreelancerCard key={p.id} professional={p} /> ))} </div>

            </SectionContainer>
        </div>
    )
}
