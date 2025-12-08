'use client';

import Image from 'next/image';
import tick from '@/assets/icons/tick-circle.svg'
import arrow from '@/assets/icons/arrow-right.svg'
import Link from 'next/link';
import { TiTick } from "react-icons/ti";
import VerifiedDot from '../ui/VerifiedDot';

export default function FreelancerCard({professional}) {

  // console.log('profe: ', professional)

  const isVerify = professional?.isVerify || professional?.user?.isVerify || false;
  
  return (
    <div
      className="
        rounded-[8px] bg-white shadow-lg 
        overflow-hidden  transition border border-gray-200
      "
    >
      {/* Cover */}
      <div className="relative h-48 ">
        <Image
          src={professional?.profileImage || professional?.user?.profileImage}
          alt="Professional Image"
          fill
          className="object-cover"
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          priority={false}
        />
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        {/* Top row: name + verified + rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-semibold text-[#202020] font-open-sans">{professional?.firstName || professional?.user?.firstName} {professional?.lastName || professional?.user?.lastName}</span>
          
          {
            isVerify && (
               <VerifiedDot />
            )
          }
          </div>

          <div className="flex items-center gap-1 text-[16px] text-gray-600">
            <span className="text-[#FFA726] ">★</span>
            <span className="font-medium">{professional?.rating || professional?.user?.rating || 0}</span>
            <span className="text-gray-400">({professional?.ratingCount || professional?.rateReviews?.length || 0})</span>
          </div>
        </div>

        {/* Category link (green) */}
        <div className="mt-1">
          <button
            type="button"
            className="text-[14px] text-[#1e863a] bg-[#e7f3e9] underline decoration-transparent hover:decoration-[#1e863a] px-2 rounded font-medium"
          >
            {professional?.category?.title || professional?.title}
          </button>
        </div>

        {/* Short description */}
        <p className="mt-2 text-[14px]  font-open-sans leading-5 text-[#9F9C96] line-clamp-2">
         {professional?.about || professional?.user?.about}
        </p>

        {/* Footer action */}
        <div className="mt-3">
          <Link
            href={`/details/${professional?.id || professional?.user?.id}`}
            className="inline-flex font-open-sans items-center  text-[16px] font-medium text-gray-700 hover:text-[#144A6C]"
          >
            Hire Now <span aria-hidden><Image src={arrow} alt="icon"/></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
