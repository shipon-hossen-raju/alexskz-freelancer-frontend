'use client'
import EditClientProfile from '@/components/clients/EditClientProfile';
import EditProfessionalProfile from '@/components/professionals/EditProfessionalProfile';
import Loading from '@/components/shared/Loading';
import CustomContainer from '@/components/ui/CustomContainer';
import { useGetUserProfileQuery } from '@/redux/auth/authApi';
import { Divider } from 'antd';
import Link from 'node_modules/next/link';
import React from 'react'
import { useSelector } from 'react-redux';

export default function EditProfilePage() {
      const { data: user, isLoading, isError, error } = useGetUserProfileQuery();
       
      //  if (isError) {
     
      //    throw new Error(error?.data?.message)
      //  }
     
       if (isLoading) {
         return <Loading />
       }
     
     
     
       const role = user?.data?.role;
  return (
   <CustomContainer>
            {/* links */}
            <div className='mb-8'>
                <Link href="/profile" className="font-nunito text-gray-400 font-medium">Profile</Link>
                <Divider type="vertical" />
                <Link href="" className="font-nunito text-gray-700 font-medium">Edit Profile</Link>
                
            </div>

    {
        (role==='USER') && (
            <EditClientProfile />
        )
    }

    {
        (role === 'FREELANCER') && (
            <EditProfessionalProfile />
        )
    }
   </CustomContainer>
  )
}
