'use client'
import FlexibleBanner from '@/components/shared/FlexibleBanner'
import SearchField from '@/components/shared/SearchField'
import CustomContainer from '@/components/ui/CustomContainer'
import React from 'react'
import hero from "@/assets/image/Explore _1.png";
// import hero from '@/assets/image/exploreBG.png'
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
          title="Explore services and professionals for your business"
          subtitle="Browse categories, discover popular services and meet top-rated professionals."
          SearchField={SearchField}
          onSearch={(q) => console.log("search:", q)}
          tags={categories}
          overlayClass="bg-black/45"
          className="mb-6"
          radius=""
          titleClass='text-white'
          subtitleClass='text-white/80'
        />
      </div>

      {/* Category of services */}
      <div>
        <CategoriesSection heading="Service categories" />
      </div>

      {/* Popular services */}
      <div>
        <PopularServiceSection />
      </div>

      {/* Top rated Professionals */}
      <div>
        <FreelancerSection heading="Top rated professionals" />
      </div>
    </CustomContainer>
  );
}
