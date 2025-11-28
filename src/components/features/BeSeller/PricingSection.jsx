'use client'
import SectionContainer from '@/components/shared/SectionContainer'
import { pricingPlans } from '@/lib/plans'
import React from 'react'
import PricingCard from './PricingCard'




export default function PricingSection({BeSeller = false}) {
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
