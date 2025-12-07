'use client';

import React from 'react'
import RatingsHeader from './RatingsHeader'


import Image from 'next/image';


// bg layers (use your two files)
import bgWaves1 from '@/assets/image/bgVec2.svg';
import bgWaves2 from '@/assets/image/bgVec1.svg'; // <-- second SVG

import p1 from '@/assets/image/Reviewer.png';
import Heading from '@/components/ui/Heading';
import Reviews from './Reviews';



export default function RatingReviewsSection({rating}) {
    const testimonials = rating?.reviews || [];

  return (
    <div>
        <RatingsHeader rating={rating?.ratingAvg || 0} total={rating?.reviews?.length || 0}/>


        {/* reviews */}
        <div>
             <div className="grid grid-cols-1  gap-4 md:gap-5">
                                {testimonials.map((t, i) => (
                                    <div key={t.id} >
                                        <Reviews review={t} />
                                    </div>
                                ))}
                            </div>
        </div>
    </div>
  )
}
