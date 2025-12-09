'use client'
import SectionContainer from '@/components/shared/SectionContainer'

import React from 'react'
import PricingCard from './PricingCard'
import { useGetAllSubscriptionQuery } from '@/redux/api/subscriptionApi'
import Loading from '@/components/shared/Loading'




export default function PricingSection({BeSeller = false}) {
  const {data: subscriptionData, isLoading, error} = useGetAllSubscriptionQuery();
  if(isLoading) {
    return <Loading />
  }
  if(error){
    // console.log('error', error)
    return <div>No subscription plans found</div>
  }
  const pricingPlans = subscriptionData?.data ;
  // console.log('plans', subscriptionData)
  return (
    <div>
        <SectionContainer heading="Plans for every Professional" title="Pricing">

          
            <div className="grid gap-10 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            { pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} BeSeller={BeSeller}/>
            ))

            }
            </div>

        </SectionContainer>
    </div>
  )
}
