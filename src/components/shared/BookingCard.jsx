import React from 'react'
import Image from 'next/image'
import TealBtn from '../ui/TealBtn'
import { CiCalendar } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { useSelector } from 'react-redux';
import TealOutLineBtn from '../ui/TealOutLineBtn';

export default function BookingCard({ booking }) {

    const user = useSelector((state) => state.user.user ?? null);
    const role = useSelector((state) => state.user.role ?? null);


    return (
        <div className='p-2 bg-white border border-black/10 rounded-[10px] grid grid-cols-1 md:grid-cols-5 items-center gap-4'>
            {/* 1st col */}
            <div className='flex flex-col md:flex-row gap-2 items-center md:items-stretch md:col-span-2'>
                {/* image */}
                <div className='w-30  '>
                    <Image src={booking.image} alt="image" className="rounded-[8px] h-full object-cover" />
                </div>

                {/* details */}
                <div className='space-y-2  text-center md:text-left '>
                    <h3 className='text-[#0A0A0A] font-open-sans font-semibold'>{booking.name}</h3>
                    {
                        role === 'Client' && (
                            <p className='bg-[#e7f3e9] rounded-md p-1 text-sm text-[#1e863a] font-nunito font-medium'>{booking.category}</p>
                        )
                    }
                    <p className=' text-[#9F9C96] font-open-sans flex items-center justify-center md:justify-start gap-1 text-[16px]'>
                        <CiCalendar />
                        {booking.date}
                    </p>
                </div>
            </div>

            {/* 2nd col */}
            <div className=' flex justify-center col-span-1'>
                <p className='text-[#717182] flex items-center gap-1 text-[16px]'>
                    <CiClock2 />
                    {booking.time}
                </p>
            </div>

            {/* 3rd col */}
            <div className=' flex justify-center md:justify-end md:col-span-2'>
                {booking.status === 'confirmed' && (
                    <div className='space-y-2'>
                        <div className=' flex justify-center md:justify-end'>
                            <p className='text-center bg-[#0690E733] py-1 text-[#0690E7] rounded-[8px] font-open-sans text-sm w-20 '>{booking.status}</p>
                        </div>
                        <TealBtn text="Message Now" />
                    </div>
                )}
                {booking.status === 'pending' && (
                    <div>
                        <div className=' flex justify-center md:justify-end'>
                            <p className='text-center bg-[#FFC368] py-1 text-[#FFFFFF] rounded-[8px] font-open-sans text-sm w-20 '>{booking.status}</p>
                        </div>
                        {
                            role === 'Become a Pro' && (
                                <div className='flex gap-2 mt-2'>
                                    <TealOutLineBtn text="Reject"/>
                                    <TealBtn text="Accept" />
                                </div>
                            )
                        }

                    </div>
                )}
                {booking.status === 'canceled' && (
                    <div className='space-y-2'>
                        <div className=' flex justify-center md:justify-end'>
                            <p className='text-center bg-[#FF26001A] py-1 text-[#FF2600] rounded-[8px] font-open-sans text-sm w-20 '>{booking.status}</p>
                        </div>
                       {
                            role === 'Client' && (
                                 <TealBtn text="Reschedule" />
                            )
                       }
                    </div>
                )}
                {booking.status === 'completed' && (
                    <div>
                        <p className='text-center bg-[#00FF5133] py-1 text-[#1f7a33] rounded-[8px] font-open-sans text-sm w-20 '>{booking.status}</p>

                    </div>
                )}
            </div>
        </div>
    )
}
