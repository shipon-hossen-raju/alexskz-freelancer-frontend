

import PricingSection from '@/components/features/BeSeller/PricingSection'
import CloseBtn from '@/components/ui/CloseBtn'


import React from 'react'





export default function PricePage() {



  return (
    <div className=''>

      {/* close button */}
      <CloseBtn path="/sign-up" />

      <div className='pb-10'>
        <PricingSection />
      </div>
    </div>
  )
}
