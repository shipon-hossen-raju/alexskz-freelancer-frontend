'use client'
import FlexibleBanner from '@/components/shared/FlexibleBanner'
import CustomContainer from '@/components/ui/CustomContainer'
import React, { useEffect, useState } from 'react'
import hero from '@/assets/image/serviceBG.png'
import Heading from '@/components/ui/Heading'
import SearchWithFilter from '@/components/ui/SearchWithFilter'
import PopularServiceCard from '@/components/features/explore/PopularServiceCard'
import CustomPagenation from '@/components/shared/CustomPagenation'
import { useGetCertifiedServicesQuery } from '@/redux/api/serviceApi'
import Loading from '@/components/shared/Loading'
import { useSearchParams } from 'next/navigation'          // correct import
import { useGetAllCategoryQuery } from '@/redux/api/categoryApi'

export default function ServicesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [services, setServices] = useState([])

  const searchParams = useSearchParams()
  const searchTerm = (searchParams.get('searchTerm') || '').trim()


  // Hooks MUST be top-level. Use `skip` option to prevent fetching when not needed.
  // Skip certified when there's a searchTerm (we'll show search results instead).
  const {
    data: certifiedServicesData,
    isLoading: isCertifiedLoading,
    isError: isCertifiedError,
  } = useGetCertifiedServicesQuery(undefined, { skip: !!searchTerm })

  // Only run category search when we have a searchTerm
  const {
    data: searchedCategoriesData,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useGetAllCategoryQuery({ searchTerm }, { skip: !searchTerm })



  // When either data changes, update `services` in an effect (not in render)
  useEffect(() => {
    if (searchTerm) {
      // handle search response
      if (!isSearchLoading && !isSearchError && searchedCategoriesData) {
        // flatten services from categories -> category.service
        const categories = searchedCategoriesData?.data?.categories || []
        const flattened = categories.flatMap(cat => cat.service ?? [])
        setServices(flattened)
        setCurrentPage(1) // optional: reset to first page on new search
      } else if (isSearchError) {
        setServices([]) // show empty if search errored
      }
    } else {
      // no searchTerm -> show certified services
      if (!isCertifiedLoading && !isCertifiedError && certifiedServicesData) {
        const svc = certifiedServicesData?.data?.result || []
        setServices(svc)
      } else if (isCertifiedError) {
        setServices([])
      }
    }
    // only re-run effect when these change:
  }, [
    searchTerm,
    searchedCategoriesData,
    certifiedServicesData,
    isSearchLoading,
    isCertifiedLoading,
    isSearchError,
    isCertifiedError,
  ])

  // Loading UX: show search loading if searching, otherwise show certified loading
  if (searchTerm && isSearchLoading) {
    return (
      <CustomContainer>
        <Loading />
      </CustomContainer>
    )
  }

  if (!searchTerm && isCertifiedLoading) {
    return (
      <CustomContainer>
        <Loading />
      </CustomContainer>
    )
  }

  // If both finished but no results:
  if ((!searchTerm && (isCertifiedError || services.length === 0)) ||
      (searchTerm && (isSearchError || services.length === 0))) {
    return (
      <CustomContainer>
        <div className="py-8 text-center">
          {searchTerm ? 'No service found' : 'No certified service found'}
        </div>
      </CustomContainer>
    )
  }

  const page_size = 10
  const total = services.length
  const start = (currentPage - 1) * page_size
  const end = start + page_size
  const pageItems = services.slice(start, end)

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  const onSearch = (q) => {
    // your SearchWithFilter will likely navigate or update search params
    // We leave this empty if CustomSearch already navigates via router.push('/services?searchTerm=...')
  }

  return (
    <CustomContainer>
      <div>
        <FlexibleBanner
          bgSrc={hero}
          variant="simple"
          title="Certified Services"
          subtitle="Trusted professional service packages verified by our experts."
          overlayClass="bg-black/45"
        />
      </div>

      <div className='flex flex-col md:flex-row gap-4 justify-between items-center mt-10 lg:mt-20'>
        <div>
          <Heading text="Certified Services" />
        </div>

        <div className="max-w-3xl">
          <SearchWithFilter onSearch={onSearch} />
        </div>
      </div>

      <hr className='text-[#D4D4D4] my-6' />

      <div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {pageItems.map((s) => (
            <PopularServiceCard key={s.id ?? s._id} service={s} />
          ))}
        </div>

        <div className='mt-10 lg:mt-20'>
          <CustomPagenation
            total={total}
            page_size={page_size}
            current={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </CustomContainer>
  )
}
