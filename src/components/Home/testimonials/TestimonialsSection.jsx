// components/testimonials/TestimonialsSection.jsx
'use client';

import Image from 'next/image';
import TestimonialCard from './TestimonialCard';

// bg layers (use your two files)
import bgWaves1 from '@/assets/image/bgVec2.svg';
import bgWaves2 from '@/assets/image/bgVec1.svg'; // <-- second SVG

import p1 from '@/assets/image/Reviewer.png';
import Heading from '@/components/ui/Heading';
import { useGetReviewsForPublicQuery } from '@/redux/api/publicApi';

const testimonials = [
    { id: 1, photo: p1, rating: 5, author: 'Adam Goni', role: 'CEO of khai dai .com', quote: 'The freelancer I hired exceeded my expectations. Communication was smooth, and the project was delivered!' },
    { id: 2, photo: p1, rating: 5, author: 'Adam Goni', role: 'CEO of khai dai .com', quote: 'The freelancer I hired exceeded my expectations. Communication was smooth, and the project was delivered!' },
    { id: 3, photo: p1, rating: 5, author: 'Adam Goni', role: 'CEO of khai dai .com', quote: 'The freelancer I hired exceeded my expectations. Communication was smooth, and the project was delivered!' },
    { id: 4, photo: p1, rating: 5, author: 'Adam Goni', role: 'CEO of khai dai .com', quote: 'The freelancer I hired exceeded my expectations. Communication was smooth, and the project was delivered!' },
    { id: 5, photo: p1, rating: 5, author: 'Adam Goni', role: 'CEO of khai dai .com', quote: 'The freelancer I hired exceeded my expectations. Communication was smooth, and the project was delivered!' },
    { id: 6, photo: p1, rating: 5, author: 'Adam Goni', role: 'CEO of khai dai .com', quote: 'The freelancer I hired exceeded my expectations. Communication was smooth, and the project was delivered!' },
    { id: 7, photo: p1, rating: 5, author: 'Adam Goni', role: 'CEO of khai dai .com', quote: 'The freelancer I hired exceeded my expectations. Communication was smooth, and the project was delivered!' },
    { id: 8, photo: p1, rating: 5, author: 'Adam Goni', role: 'CEO of khai dai .com', quote: 'The freelancer I hired exceeded my expectations. Communication was smooth, and the project was delivered!' },
];

export default function TestimonialsSection({ heading }) {
    const {data, isLoading, isError} = useGetReviewsForPublicQuery();
    if(isLoading){
        return <div>Loading Testimonials...</div>
    }
    const reviews = data?.data || [];

    // console.log(reviews)

    if(isError || reviews.length === 0){
        return <div> No Testimonials Found </div>
    }
    return (
        // <SectionContainer heading={heading} title="Testimonial">

        // </SectionContainer>
        <section className="relative pt-10 md:pt-20">
            <div className='mx-auto  px-4 container'>

                <div className="mb-4">
                    <span className="inline-block text-[18px] font-medium text-[#144A6C] relative pl-3 font-open-sans">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] bg-[#144A6C]" />
                        Testimonial
                    </span>
                </div>

                {/* Title */}
                <div className='mb-8'>
                    <Heading text={heading} />
                </div>
            </div>
            {/* BG layer 1 */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <Image
                    src={bgWaves1}
                    alt=""
                    fill
                    className="object-cover "
                    sizes="100vw"
                />
            </div>

            {/* BG layer 2 (offset a bit for the layered look) */}
            <div className="absolute left-0 h-[85%]  w-full -z-10 pointer-events-none">
                <Image
                    src={bgWaves2}
                    alt=""
                    fill
                    className="object-cover  "
                    sizes="100vw"
                />
            </div>

            <div className="mx-auto  px-4 container">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                    {reviews.map((review, i) => (
                        <div key={review.id} >
                            <TestimonialCard review={review} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
