import React from 'react'
import Paragraph from '../ui/Paragraph'
import icon1 from '@/assets/icons/icon1.svg'
import icon2 from '@/assets/icons/icon2.svg'
import icon3 from '@/assets/icons/icon3.svg'
import icon4 from '@/assets/icons/icon4.svg'
import WhiteBoxCard from '../shared/WhiteBoxCard'
import SubHeadingBlack from '../ui/SubHeadingBlack'
import Heading from '../ui/Heading'
import BookingCard from '../shared/BookingCard'
import img from '@/assets/image/freelancer/user.jpg'
import { useGetUserProfileQuery } from '@/redux/auth/authApi'
import CustomSearch from '../ui/CustomSearch'
import { useGetClientHomeQuery, useGetFreelancerHomeQuery } from '@/redux/api/profileApi'
import Loading from '../shared/Loading'

const bookings = [
    { id: 1, name: "Mr. Lee", image: img, category: "Finance & Accounting", date: "Oct 7,2025", time: "10:00 AM", status: "confirmed" },
    { id: 2, name: "Mr. Lee", image: img, category: "Finance & Accounting", date: "Oct 7,2025", time: "10:00 AM", status: "pending" },
    { id: 3, name: "Mr. Lee", image: img, category: "Finance & Accounting", date: "Oct 7,2025", time: "10:00 AM", status: "canceled" },
    { id: 4, name: "Mr. Lee", image: img, category: "Finance & Accounting", date: "Oct 7,2025", time: "10:00 AM", status: "completed" },
]

export default function ClientHome() {
   
    const { data: homeData, error: userError, isLoading: isUserHomeLoading } = useGetClientHomeQuery();
    if(isUserHomeLoading){
        return <div> <Loading /> </div>
    }
    const home = homeData?.data;

    // console.log('home', home)

    
    const firstName = home?.firstName || "";
    const lastName = home?.lastName || "";
    const name = `${firstName} ${lastName}`.trim();
    const upComingBookings = home?.UpcomingBookings;
   

    const items = [
        {
            id: 1,
            icon: icon1,
            title: 'Upcoming Appointments',
            count: home?.upComingBookings || 0,
            status: 'This week',
        },
        {
            id: 2,
            icon: icon2,
            title: 'Messages',
            count: home?.unReadMessageCount || 0,
            status: 'unread ',
        },
        {
            id: 3,
            icon: icon3,
            title: 'Reviews  Given',
            count: home?.givenRatingsCount || 0,
            status: 'Total reviews',
        },
        {
            id: 4,
            icon: icon4,
            title: 'Active Bookings',
            count: home?.activeBookings || 0,
            status: 'Ongoing',
        },
    ]

    return (
        <div>

            <div className="pb-6 md:hidden ">
                <CustomSearch />
            </div>

            {/* Heading */}
            <div
                className="flex w-full items-center gap-4 rounded-2xl p-6 shadow-sm border border-transparent"
                style={{
                    // base pale blue-gray background with two soft green radial highlights (left small, right large)
                    backgroundColor: '#EAF3F6',
                    backgroundImage: `radial-gradient(circle at 6% 50%, rgba(139,207,154,0.08) 0%, rgba(139,207,154,0.02) 25%, transparent 40%),
                          radial-gradient(circle at 85% 55%, rgba(139,207,154,0.18) 0%, rgba(139,207,154,0.08) 20%, rgba(139,207,154,0.02) 45%, transparent 65%)`,
                    backgroundRepeat: 'no-repeat',
                }}
            >


                {/* Waving hand emoji */}
                <span className="text-3xl">👋</span>

                {/* Text content */}
                <div className='space-y-2'>
                    <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#333333] font-open-sans">
                        Welcome back, {name}!
                    </h2>

                    <Paragraph text="Here's what's happening in your account today" />
                </div>
            </div>

            {/* cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-16'>
                {
                    items.map((item) => (
                        <WhiteBoxCard item={item} key={item.id} />
                    ))
                }

            </div>

            {/* upcoming bookings */}
            <div>
                <div className='flex justify-between items-center'>
                    <div className='flex-1'>
                        <Heading text="Upcoming Bookings" />
                    </div>
                    <p className=' text-[#030213] font-open-sans bg-[#ECEEF2] p-1 rounded-[8px]'>{upComingBookings?.length || 0} Total</p>
                </div>

                {/* booking card */}
                <div className='grid grid-cols-1 gap-4 mt-10'>
                    {upComingBookings?.slice(0,4).map((booking) => (
                        <BookingCard booking={booking} key={booking.id} />
                    ))}
                </div>
            </div>

        </div>
    )
}
