'use client'
import ClientProfile from '@/components/clients/ClientProfile';
import ProfessionalProfile from '@/components/professionals/ProfessionalProfile';
import Loading from '@/components/shared/Loading';
import CustomContainer from '@/components/ui/CustomContainer'
import { useGetUserProfileQuery } from '@/redux/auth/authApi';
import React from 'react'
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const { data: user, isLoading, isError, error } = useGetUserProfileQuery();
  
  if (isError) {

    throw new Error(error?.data?.message)
  }

  if (isLoading) {
    return <Loading />
  }



  const role = user?.data?.role;

  return (
    <CustomContainer>

      {
        (role === 'USER') && (
          <ClientProfile />
        )
      }

      {
        (role === 'FREELANCER') && (
          <ProfessionalProfile />
        )
      }

    </CustomContainer>
  )
}
