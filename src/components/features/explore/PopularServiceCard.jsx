'use client';

import ServicePreviewModal from '@/components/modals/ServicePreviewModal';
import GreenPara from '@/components/ui/GreenPara';
import { useGetUserProfileQuery } from '@/redux/auth/authApi';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { MdOutlineArrowOutward } from "react-icons/md";

export default function PopularServiceCard({ service }) {


  const [open, setOpen] = useState(false);
  const {data: userData, error, isLoading} = useGetUserProfileQuery();
  if(isLoading) {
    return;
  }

  const handleBooking = () => {
    if(!userData){
      return toast.error("Please login to book a service");
    }
    else {
      setOpen(true);
    }
  }

  return (
    <div className="group">
      {/* Cover */}
      <div className="relative h-36 sm:h-40 rounded-xl overflow-hidden">
        <Image
          src={service?.thumbnail}
          alt="service"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 100vw"
        />
      </div>

      {/* Body */}
      <div className="mt-2.5">
        <h3 className="text-[14px] font-semibold text-gray-800 line-clamp-1 font-open-sans">
          {service?.title}
        </h3>

        <p className="mt-1 text-[13px] text-[#8BCF9A] font-open-sans">
          
        </p>
        <GreenPara text={`From  ${service?.price}$`}/>

        <button
         onClick={handleBooking}
        className="cursor-pointer font-open-sans mt-2 inline-flex items-center gap-2 text-[18px] text-gray-700 font-medium hover:text-gray-700"
        >
          Book Now <span aria-hidden><MdOutlineArrowOutward /></span>
        </button>
      </div>

       <ServicePreviewModal open={open} onClose={() => setOpen(false)} service={service}/>
    </div>
  );
}
