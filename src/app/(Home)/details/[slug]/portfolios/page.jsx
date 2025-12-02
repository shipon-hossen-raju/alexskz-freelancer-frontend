// components/ExpertHeader.jsx
'use client';

import React from 'react';
import Image from 'next/image';
import TealBtn from '@/components/ui/TealBtn';
import CustomContainer from '@/components/ui/CustomContainer';
import avatarSrc from '@/assets/image/freelancer/user.jpg'
import PortfolioSection from '@/components/features/Professiona-details/PortfolioSection';
import VerifiedDot from '@/components/ui/VerifiedDot';
import { useGetProfileForPublicViewQuery } from '@/redux/api/publicApi';
import Loading from '@/components/shared/Loading';

export default function ProfessionalPortfolioesPage({
 params,
 
  onMessage,
}) {

  const { slug } = params;
  // console.log('slug', slug)

  // const { data, isLoading, isError, error } = useGetProfileForPublicViewQuery("69268d0a138c715af045c2a6");
      const {data, isLoading, isError, error} = useGetProfileForPublicViewQuery(slug);
  
      if (isLoading) {
          return <Loading />
      }
  
      if (isError) {
          // console.log('error', error)
          throw new Error(error?.data?.message || error?.message || "Failed to load data");
      }
  
      // console.log('data details', data?.data)
  
      const profileData = data?.data;
  
  return (
    <CustomContainer >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
        {/* Left: Avatar + text */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {/* Avatar */}
          <div className="relative h-24 w-24 ring-1 ring-[#8BCF9A] rounded-full  shrink-0">
            <Image
              src={profileData?.profileImage}
              alt={`avatar`}
              fill
              
              className="rounded-full object-cover"
              priority
            />
          </div>

          {/* Text */}
          <div className="min-w-0">
            {/* Name + verified + rating */}
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 font-open-sans">
                {profileData?.firstName} {profileData?.lastName}
              </h3>

              {/* Verified dot */}
              {
                profileData?.isVerify && <VerifiedDot />
              }

              {/* Rating */}
              <span className="flex items-center text-sm text-gray-600 gap-1">
                {/* star icon (inline svg for crisp small size) */}
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 fill-yellow-400"
                  aria-hidden="true"
                >
                  <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.95 5.06 16.8l.94-5.49-4-3.9 5.53-.8L10 1.6z" />
                </svg>
                <span className="font-medium">{profileData?.rating?.ratingAvg || 0}</span>
                <span className="text-gray-400">{`(${profileData?.rating?.reviews?.length})`}</span>
              </span>
            </div>

            {/* Subtitle */}
            <p className="mt-0.5 text-sm text-gray-500 ">
              {/* {subtitle} */}
            </p>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="shrink-0">
          {/* Adjust props to match your TealBtn implementation */}
          <TealBtn onClick={onMessage} text="Message Now">
           
          </TealBtn>
        </div>
      </div>

      <div className='mt-10 lg:mt-20'>
        <PortfolioSection items={profileData?.portfolio}/>
      </div>
    </CustomContainer>
  );
}
