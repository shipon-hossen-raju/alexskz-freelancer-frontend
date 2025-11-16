import React from 'react'
import { Divider } from 'antd'
import fb from "@/assets/icons/fb.svg"
import insta from "@/assets/icons/insta.svg"
import Image from 'next/image'
import email from '@/assets/icons/email.svg'
import logo from '@/assets/logo.svg'
import phn from '@/assets/icons/call.svg'
import x from '@/assets/icons/x.svg'
import Link from 'node_modules/next/link'

export default function Footer() {
    return (
        <footer className=' bg-[#0C2C41] py-4 lg:py-10'>
            <div className='container mx-auto px-[4%] '>
                <div className='  flex flex-col md:flex-row gap-8 md:justify-between   '>
                    {/* 1st col */}
                    <div className=' flex flex-col items-center md:items-start  gap-4 '>
                       <Link href="/">
                        <Image src={logo} alt="logo" />
                       </Link>

                        <p className='font-poppins text-gray-400 text-xs lg:text-sm max-w-[294px] text-center md:text-justify'>
                            This platform is a digital home for preserving family legacy, celebrating Black history, and strengthening connections across generations. It offers a secure space for family members to explore historical timelines, share personal stories, access family trees, and pass down traditions
                        </p>
                    </div>

                    {/* 2nd col */}
                    <div className=' space-y-8 text-center md:text-left '>
                        <h1 className='font-poppins text-xl lg:text-2xl text-white font-semibold'>Categories</h1>
                        <ul className='text-sm lg:text-[16px] space-y-4 font-open-sans text-gray-400'>
                            <li>Finance</li>
                            <li>Legal</li>
                            <li>Accounting</li>
                            <li>Hr Resource</li>
                        </ul>
                    </div>

                    {/* 3rd col */}
                    <div className=' space-y-8 text-center md:text-left '>
                        <h1 className='font-poppins text-xl lg:text-2xl text-white font-semibold '>Information</h1>
                        <ul className='text-sm lg:text-[16px] space-y-4 font-open-sans text-gray-400'>
                            <li><Link href="about-us">About Us</Link></li>
                            <li><Link href="/contact-us">Contact Us</Link></li>
                            <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                            
                        </ul>
                    </div>



                </div>


                {/* Devider */}
                <div className=' '>
                    <Divider style={{ borderColor: '#B0B0B0' }} />

                    <div className='flex flex-col gap-4 md:flex-row md:justify-between items-center '>
                        <div className=' flex flex-col md:flex-row gap-4 md:gap-8  items-center'>
                            <p className=' md:text-xl flex items-center gap-2 text-gray-400 '>
                                <Image src={email} alt="email" /> support@gmail.com
                            </p>

                            <p className=' md:text-xl flex items-center gap-2 text-gray-400'>
                                <Image src={phn} alt="email" /> +0000000000
                            </p>
                        </div>

                        {/* socials */}
                        <div className='flex gap-2 justify-center '>
                            <Image src={fb} alt="fb" width="26"/>
                            <Image src={insta} alt="fb" width="32"/>
                            <Image src={x} alt="fb" width="28"/>
                        </div>

                    </div>
                </div>
            </div>



        </footer>
    )
}
