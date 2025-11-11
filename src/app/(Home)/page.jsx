'use client'

import ClientHome from '@/components/clients/ClientHome';
import BannerHero from '@/components/Home/BannerHero';
import FaqSection from '@/components/Home/FAQSection';
import HowItWorks from '@/components/Home/HowItWorks';
import RisingStarsSection from '@/components/Home/RisingStarsSection';
import TestimonialsSection from '@/components/Home/testimonials/TestimonialsSection';
import ProfessionalHome from '@/components/professionals/ProfessionalHome';
import CategoriesSection from '@/components/shared/CategorySection';
import FreelancerSection from '@/components/shared/FreelancerSection';
import CustomContainer from '@/components/ui/CustomContainer';
import React from 'react'
import { useSelector } from 'react-redux';

export default function HomePage() {

  const user = useSelector((state) => state.user.user ?? null);
  const role = useSelector((state) => state.user.role ?? null);

  const handleSearch = (query) => {

    console.log('search:', query);
  };

  // throw new Error ("")

  return (
    <div>
      {
        (!user) && (
          <div>
            {/* <Banner /> */}
            <BannerHero onSearch={handleSearch} />

            {/* Category */}
            <div>
              <CategoriesSection heading="Explore millions of pros" />
            </div>

            {/* Freelancer */}
            <div>
              <FreelancerSection heading="Featured Professionals" />
            </div>

            {/* How it works */}
            <div className='mt-10 lg:mt-20'>
              <HowItWorks />
            </div>

            {/* Testimonials */}
            <div>
              <TestimonialsSection heading="Hear from Our Clients" />
            </div>
            {/* Rising Star */}
            <div>
              <RisingStarsSection heading="Rising Stars" />
            </div>

            {/* FAQ */}
            <div>
              <FaqSection />
            </div>
          </div>
        )
      }

      {
        user && role === 'Client' && (
          <CustomContainer>
            <ClientHome />
          </CustomContainer>
        )
      }

      {/* professional home */}

      {
        user && role === 'Become a Pro' && (
          
            <ProfessionalHome />
         
        )
      }
    

    </div>
  )
}
