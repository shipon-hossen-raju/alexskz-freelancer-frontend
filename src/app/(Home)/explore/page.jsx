'use client'
import FlexibleBanner from '@/components/shared/FlexibleBanner'
import SearchField from '@/components/shared/SearchField'
import CustomContainer from '@/components/ui/CustomContainer'
import React from 'react'
import hero from '@/assets/image/exploreBG.png'
import CategoriesSection from '@/components/shared/CategorySection'
import FreelancerSection from '@/components/shared/FreelancerSection'
import PopularServiceSection from '@/components/features/explore/PopularServiceSection'
import { useGetAllCategoryQuery } from '@/redux/api/categoryApi'

export default function ExplorePage() {
    const {data: categoriesData, isLoading, isError, error} = useGetAllCategoryQuery();
    if(isLoading){
      return ;
    }
    const categories = categoriesData?.data?.categories;
    // console.log(categories)
  return (
    <CustomContainer>

      {/* Banner */}
      <div>
        <FlexibleBanner
          bgSrc={hero}
          variant="search"
          title="Find The Right Pro For Your Business"
          SearchField={SearchField}
          onSearch={(q) => console.log('search:', q)}
          tags={
            categories
            // [
            // { label: 'Finance & Accounting', href: '/finance-accounting' },
            // { label: 'Hr & legal', href: '/hr-legal' },
            // { label: 'Online Freelancer', href: '/online' },
            // // { label: 'Finance', href: '/search?cat=finance2' },
            // { label: 'Finance', href: '/finance' },
          // ]
        }
          overlayClass="bg-black/45"
          className="mb-6"
        />

      </div>

      {/* Category of services */}
      <div>
        <CategoriesSection heading="Categories of Services"/>
      </div>

      {/* Popular services */}
      <div>
        <PopularServiceSection/>
      </div>

      {/* Top rated Professionals */}
      <div>
        <FreelancerSection heading="Top Rated Professionals"/>
      </div>

    </CustomContainer>
  )
}
