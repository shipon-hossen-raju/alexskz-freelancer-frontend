'use client'
import CustomContainer from '@/components/ui/CustomContainer'
import React from 'react'
import coverPhoto from '@/assets/image/freelancer/coverPhoto.jpg'
import userImg from '@/assets/image/freelancer/user.jpg'
import Image from 'next/image'
import { Avatar } from 'antd';
import Heading from '@/components/ui/Heading'
import Paragraph from '@/components/ui/Paragraph'
import TealOutLineBtn from '@/components/ui/TealOutLineBtn'
import SubHeading from '@/components/ui/SubHeading'
import clock from '@/assets/icons/clock.svg'
import msg from '@/assets/icons/messages-2.svg'
import circleMark from '@/assets/icons/checkmark-circle.svg'
import location from '@/assets/icons/location.svg'
import GreenPara from '@/components/ui/GreenPara'
import tick from '@/assets/icons/greenTick.svg'
import star from '@/assets/icons/star.svg'
import PortfolioSection from '@/components/features/Professiona-details/PortfolioSection'
import SubHeadingBlack from '@/components/ui/SubHeadingBlack'
import OfferedServices from '@/components/features/Professiona-details/OfferedServices'
import RatingReviewsSection from '@/components/features/Professiona-details/RatingReviewsSection'
import Link from 'node_modules/next/link'
import VerifiedDot from '@/components/ui/VerifiedDot'
import { Divider } from 'node_modules/antd/es/index'
import skills from '@/assets/icons/skills.png'
import { useGetProfileForPublicViewQuery } from '@/redux/api/publicApi'
import Loading from '@/components/shared/Loading'


export default function FreelancerDetailsPage({ params }) {
    const { slug } = params;

    const { data, isLoading, isError, error } = useGetProfileForPublicViewQuery("69268d0a138c715af045c2a6");
    // const {data, isLoading, isError, error} = useGetProfileForPublicViewQuery(slug);

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        // console.log('error', error)
        throw new Error(error?.data?.message || error?.message || "Failed to load data");
    }

    console.log('data details', data?.data)

    const profileData = data?.data;

    const lists = [
        {
            id: 1,
            icon: clock,
            text: `Experience: ${profileData?.experience}`,
        },
        {
            id: 2,
            icon: msg,
            text: `Language: ${profileData?.language}  `,
        },
        {
            id: 3,
            icon: circleMark,
            text: 'Verified Pro',
        },
        {
            id: 4,
            icon: location,
            text: `Location: ${profileData?.address}`,
        },
        {
            id: 5,
            icon: skills,
            text: `Skills: ${profileData?.skills?.join(', ') || 'N/A'}`,
        }
    ]



    return (
        <CustomContainer>
            {/* Links */}
            <div className='mb-8'>
                <Link href="" className="font-nunito text-gray-400 font-medium">Home</Link>
                <Divider type="vertical" />
                <Link href="" className="font-nunito text-gray-400 font-medium">Category</Link>
                <Divider type="vertical" />
                <Link href={`/details/${slug}`} className="font-nunito text-gray-700 font-medium">Details</Link>
            </div>

            <div className=' '>
                {/* cover photo */}
                <div className='relative h-[60vh]'>
                    <Image src={profileData?.cover} alt='cover-photo' className='rounded-[8px] lg:h-[60vh] object-cover' fill />
                </div>

                {/* user image */}
                <div className=' transform -translate-y-2/4 border border-[#8BCF9A] h-24 w-24 md:h-44 md:w-44 lg:h-64 lg:w-64 xl:h-74 xl:w-74  rounded-full relative'>
                    <Image src={profileData?.profileImage} alt='profile-photo' className='rounded-full w-full h-full object-cover' fill />

                </div>



            </div>


            {/* about */}
            <div className='flex flex-col md:flex-row gap-10 md:gap-20 xl:gap-40 items-center -mt-10 lg:-mt-20'>
                {/* left section */}
                <div className='space-y-4 lg:space-y-8 md:w-3/5'>
                    <div className='flex justify-between items-center'>
                        <div className='flex  items-center gap-4 '>
                            <Heading text={`${profileData?.firstName} ${profileData?.lastName}`} />
                            {
                                profileData?.isVerify && <VerifiedDot />
                            }

                        </div>

                        <div className='flex  gap-1 items-center'>
                            <Image src={star} alt="icon " className='lg:w-5' />
                            <p className='text-[#333333] font-open-sans text-sm lg:text-xl'>{profileData?.rating?.ratingAvg || 0}</p>
                            <Paragraph text={`(${profileData?.rating?.reviews?.length})`} />
                        </div>
                    </div>
                    <SubHeading text={profileData?.category?.title} />

                    <ul className='space-y-2 lg:space-y-6'>
                        {
                            lists.map((list) => {
                                if (list.id === 3 && !profileData?.isVerify) return null;
                                return (
                                    <li key={list.id} className='flex gap-2 items-center'>
                                        <Image src={list.icon} alt='icon' className="w-7 h-7 object-cover" />
                                        <Paragraph text={list.text} />
                                    </li>
                                )
                            })
                        }
                    </ul>

                    <div>
                        <SubHeadingBlack text="About me" />
                    </div>

                    <Paragraph text={profileData?.about}>
                        {/* <GreenPara text="Read more....." /> */}
                    </Paragraph>

                </div>

                {/* right section */}
                <div className='md:w-2/5'>
                    <div className=" bg-white rounded-lg shadow-sm p-8 md:py-20 md:px-10 mx-auto">
                        {/* Top area: avatar + name/status */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex-shrink-0 mx-auto sm:mx-0">
                                <div className="w-20 h-20 rounded-full overflow-hidden ring-1 ring-[#8BCF9A] ">
                                    <img
                                        src={profileData?.profileImage}
                                        alt="user"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>


                            <div className="text-center sm:text-left flex-1 font-open-sans">
                                <div className="text-lg font-semibold text-gray-800">{`${profileData?.firstName} ${profileData?.lastName}`}</div>
                                <div className="mt-1 text-sm text-gray-500">
                                    <span className="font-medium text-gray-600">{profileData?.isOnline ? 'Online' : 'Offline'}</span>
                                    <span className="mx-2 text-xs text-gray-300">•</span>
                                    <span className="text-gray-400">{profileData?.lastActive ? `${profileData?.lastActive} Local time` : ''}</span>
                                </div>
                            </div>
                        </div>


                        {/* Button area - matches the full-width outline button in the image */}
                        <div className="mt-6 lg:mt-10 text-center ">
                            <Link href='/inbox'>
                                <TealOutLineBtn text="Message Now" block="block" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Portfolio Section */}
            <div className='mt-10 lg:mt-20 bg-white px-4 py-8 rounded-[8px]'>
                <PortfolioSection items={profileData?.portfolio?.slice(0,4)}/>

                <div className=" lg:my-6">
                    {
                        profileData?.portfolio && profileData?.portfolio?.length > 4 && (
                            <Link href={`/details/${slug}/portfolios`}
                                className="block text-center w-full rounded-[10px] py-3 md:py-4 px-6 bg-gradient-to-r from-[#92D5FF] via-teal-100 to-[#A7FFBB] text-gray-800  text-sm md:text-base shadow-sm hover:shadow-md focus:outline-none  transition-shadow cursor-pointer font-open-sans font-semibold"
                                aria-label="View more Projects"
                            >
                                View more Projects
                            </Link>
                        )
                    }
                </div>
            </div>

            {/* Offered Services */}
            <div className='mt-10 lg:mt-20'>
                <OfferedServices services={profileData?.service} availability={profileData?.availability}/>
            </div>

            {/* ratings & reviews section */}
            <div className='mt-10 lg:mt-20'>
                <RatingReviewsSection rating={profileData?.rating}/>
            </div>



        </CustomContainer>
    )
}
