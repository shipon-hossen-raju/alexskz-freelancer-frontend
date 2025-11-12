// components/auth/AuthShell.jsx
'use client';

import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import imageSrc from '@/assets/image/authImg.png'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AuthShell({
  title,
  subtitle,
  children,
  backHref = '#',
  backText = 'Back',
  step='',
  register= false

}) {


  const role2 = 'Become a Pro';
  const savedRole = useSelector((state) => state.user.initialRole ?? null)

  // console.log('from shell',savedRole)





  return (
    <div className="min-h-screen w-full bg-[#1e1f22] text-[#0c1323]">

      <div className="mx-auto max-w-5xl px-4 py-8 md:py-12 lg:py-20  ">
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] rounded-[28px] overflow-hidden">
          {/* Left image */}
          <div className="relative  min-h-[70vh]">
            <img
              src={imageSrc.src}
              alt="auth-visual"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Right panel */}
          <div className="bg-white px-5 sm:px-8 md:px-10 py-6 md:py-10 md:rounded-r-[28px] ">
            <div className='flex justify-between'>
              <div className="mb-6">
                <Link
                  href={backHref}
                  className="inline-flex items-center gap-2 text-[#526174] hover:text-[#3a4656] transition"
                >
                  <ArrowLeftOutlined className="text-[12px]" />
                  <span className="text-sm font-open-sans">{backText}</span>
                </Link>
              </div>

              {
                savedRole === role2 && register && (
                  <p className='text-[#7DBA8B] font-open-sans '>Step 1</p>
                )
              }
             {
              step && (
                 <p className='text-[#7DBA8B] font-open-sans '>{step}</p>
              )
             }
            </div>

            <div className="mb-6 flex items-start justify-between ">
              <div>
                <div className=''>
                  <h1 className="text-[#333333] text-[22px] sm:text-2xl font-bold font-open-sans">
                    {title}
                  </h1>


                </div>
                {subtitle ? (
                  <p className="text-[13px] sm:text-sm text-[#9F9C96] mt-1 font-open-sans">{subtitle}</p>
                ) : null}
              </div>


            </div>

            {/* <div className="md:max-w-md">{children}</div> */}
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
