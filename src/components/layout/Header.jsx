'use client'
import { Dropdown, Badge } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { TfiAlignJustify } from "react-icons/tfi";
import { useDispatch, useSelector } from 'react-redux';
import userImg from '@/assets/image/freelancer/user.jpg'
import userImg2 from '@/assets/image/Reviewer.png'
import { UserOutlined } from '@ant-design/icons';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import logo from '@/assets/logo2.svg'
import TealBtn from '../ui/TealBtn';
import TealOutLineBtn from '../ui/TealOutLineBtn';
import icon from '@/assets/icons/navbarIcon.svg'
import ProfileDropdown from '../ui/ProfileDropdown';
import { Search, Bell, ChevronDown, SlidersHorizontal, User, Menu, X } from "lucide-react"
import { MobileMenuItemsForLoginUser } from '@/lib/MobileMenuItemsForLoginUser';
import { MobileMenuItems } from '@/lib/MobileMenuItems';
import { useRouter } from 'next/navigation';
import CustomSearch from '../ui/CustomSearch';
import LanguageDropdown from '../ui/LanguageDropdown';
import { useGetUserProfileQuery, useLogoutUserMutation } from '@/redux/auth/authApi';
import { clearUser } from '@/redux/auth/userSlice';
import toast from 'react-hot-toast';
import Loading from '../shared/Loading';





export default function Header() {
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [ logoutUser ] = useLogoutUserMutation();

  const {data: user, isLoading, error} = useGetUserProfileQuery()

  

  if(isLoading){
    return <Loading />
  }

  console.log('user',user)

  const role = user?.data?.role;



  let items = [];

  if (user) {
    items = MobileMenuItemsForLoginUser;
  }
  else {
    items = MobileMenuItems;
  }

  // console.log(user)

  const pathname = usePathname();
  const activeBtn = "bg-[#144A6C] text-white rounded-[8px] px-4 py-1 ";

  useEffect(() => {
    const onDrawerOpen = () => setDropDownOpen(false);
    window.addEventListener('drawer:open', onDrawerOpen);
    return () => window.removeEventListener('drawer:open', onDrawerOpen);
  }, []);

  const onMenuClick = ({ key }) => {
  };

  return (
    <div className='px-2 md:px-4'>
      {/* navbar */}
      <nav className='relative z-20 container mx-auto px-2 md:px-4 xl:px-8  py-3 lg:py-4   bg-[#E1E1E1]/50 mt-4 rounded-[20px] border border-[#E1E1E1]'>

        {/* content */}
        <div className=' flex justify-between items-center '>

          {/* logo  */}
          <div className=''>
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>

          {/* search field */}
          {
            (user && (role === "Client")) && (
              <div className='hidden md:block'>
                <CustomSearch />
              </div>
            )
          }

          {/* lists */}
          <div className='hidden xl:block'>
            <ul className='font-open-sans lg:text-[16px] xl:text-[22px] flex items-center  gap-8'>
              <Link href="/"><li className={` cursor-pointer   ${pathname === "/" ? activeBtn : "hover:font-semibold hover:text-[#144A6C] "}`}>Home</li></Link>
              {
                // !user && (
                <Link href="/explore"><li className={` cursor-pointer  ${pathname === "/explore" ? activeBtn : "hover:font-semibold hover:text-[#144A6C] "}`}>Explore</li></Link>

                // )
              }
              {
                !user && (
                  <Link href="/start-selling"><li className={` cursor-pointer  ${pathname === "/start-selling" ? activeBtn : " hover:font-semibold hover:text-[#144A6C]"}`}>Join as a Pro</li></Link>

                )
              }
              {
                user && (
                  <Link href="/inbox"><li className={` cursor-pointer  ${pathname === "/inbox" ? activeBtn : "hover:font-semibold hover:text-[#144A6C] "}`}>Messages</li></Link>

                )
              }
              {
                user && (
                  <Link href="/bookings"><li className={` cursor-pointer  ${pathname === "/bookings" ? activeBtn : "hover:font-semibold hover:text-[#144A6C] "}`}>Bookings</li></Link>

                )
              }
              {
                !user && (
                  <Link href="/services"><li className={` cursor-pointer  ${pathname === "/services" ? activeBtn : "hover:font-semibold hover:text-[#144A6C] "}`}>Certified Services</li></Link>

                )
              }              {
                !user && (
                  <Link href="/about-us"><li className={` cursor-pointer ${pathname === "/about-us" ? activeBtn : " hover:font-semibold hover:text-[#144A6C]"}`}>About us</li></Link>
                )
              }




            </ul>
          </div>

          <div className='flex items-center  '>
            {/* Language button */}
            <div className=''>
              <LanguageDropdown />
            </div>

            {/* Button */}
            {
              user ? (
                <div className='flex items-center gap-2 '>
                  <Link href="/profile"><Avatar size={{ xs: 48, sm: 48, md: 50, lg: 64, xl: 70, xxl: 74 }} src={userImg.src} /></Link>
                  <div className=''>
                    <ProfileDropdown />
                  </div>
                  {/* Notifications */}
                  <div className="hidden md:block">
                    <Badge count={5} color="#8BCF9A"
                      className="
    [&_.ant-badge-count]:!shadow-none
    [&_.ant-badge-count]:!border-0
    [&_.ant-badge-dot]:!shadow-none
    [&_.ant-badge-dot]:!border-0
  ">
                      <button className="cursor-pointer text-gray-300 hover:text-white   rounded-lg transition-all duration-200 hover:scale-110">
                        <Link href="/notifications">
                          <Bell className="w-6 h-6 !text-[#8BCF9A]" />
                        </Link>
                      </button>
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className='flex gap-2 lg:gap-4 items-center '>


                  <Link href='/sign-in' className="hidden md:block  border border-[#144A6C] text-[#144A6C] font-open-sans font-semibold px-3 py-1 md:px-8 md:py-2 rounded-[8px]">
                    Sign in
                  </Link>

                  <Link href='/sign-up' className="hidden md:block bg-[#144A6C] text-white font-open-sans font-semibold px-3 py-1 md:px-8 md:py-2 rounded-[8px]">
                    Join
                  </Link>


                </div>
              )
            }

            <div className='flex items-center '>


              {/* mobile hamburger */}
              <div className="xl:hidden pl-2">

                <Dropdown
                  menu={{ items, onClick: onMenuClick }}
                  trigger={['click']}
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                  open={dropdownOpen}
                  onOpenChange={(open) => {
                    setDropDownOpen(open);
                    if (open) window.dispatchEvent(new CustomEvent('dropdown:open'));
                  }}

                  overlayStyle={{ zIndex: 1300 }}
                  getPopupContainer={() => document.body}
                >
                  <button type="button" aria-label="Open menu" className="rounded flex items-center cursor-pointer">
                    <TfiAlignJustify style={{ fontSize: 20 }} />
                  </button>
                </Dropdown>

              </div>
            </div>
          </div>


        </div>


      </nav>
    </div>
  )
}
