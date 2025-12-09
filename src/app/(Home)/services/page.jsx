


// 'use client'
// import FlexibleBanner from '@/components/shared/FlexibleBanner'
// import CustomContainer from '@/components/ui/CustomContainer'
// import React, { useEffect, useState } from 'react'
// import hero from '@/assets/image/serviceBG.png'
// import Heading from '@/components/ui/Heading'
// import SearchWithFilter from '@/components/ui/SearchWithFilter'
// import PopularServiceCard from '@/components/features/explore/PopularServiceCard'
// import CustomPagenation from '@/components/shared/CustomPagenation'
// import { useGetCertifiedServicesQuery } from '@/redux/api/serviceApi'
// import Loading from '@/components/shared/Loading'
// import { useSearchParams } from 'next/navigation'
// import { useGetAllCategoryQuery, useGetSearchedServicesQuery } from '@/redux/api/categoryApi'
// import { useSelector } from 'react-redux'   // <- fixed import

// export default function ServicesPage() {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [services, setServices] = useState([])

//   const searchParams = useSearchParams()
//   const searchTerm = (searchParams.get('searchTerm') || '').trim()

//   // ensure selectors have safe defaults
//   const categoryIds = useSelector((state) => state.filter?.categoryIds ?? [])
//   const minPrice = useSelector((state) => state.filter?.minPrice )
//   const maxPrice = useSelector((state) => state.filter?.maxPrice )
//   const isOnline = useSelector((state) => state.filter?.isOnline )
//   const topRated = useSelector((state) => state.filter?.topRated )
//   const isCertified = useSelector((state) => state.filter?.isCertified )

//   // always keep hooks at top-level; skip where needed
//   // certified services should be skipped when searching
//   const {
//     data: certifiedServicesData,
//     isLoading: isCertifiedLoading,
//     isError: isCertifiedError,
//   } = useGetCertifiedServicesQuery(undefined, { skip: !!searchTerm })

//   // use your dedicated search endpoint when searchTerm exists
//   const {
//     data: searchedCategoriesData,   // this comes from getSearchedServices (search by term)
//     isLoading: isSearchLoading,
//     isError: isSearchError,
//   } = useGetSearchedServicesQuery(searchTerm, { skip: !searchTerm })

//   // use getAllCategoryQuery for complex filters (only when there is no searchTerm but filters exist)
//   const filtersApplied =
//     Boolean(searchTerm) ||
//     (Array.isArray(categoryIds) && categoryIds.length > 0) ||
//     Boolean(minPrice) ||
//     Boolean(maxPrice) ||
//     Boolean(isOnline) ||
//     Boolean(topRated) ||
//     Boolean(isCertified)

//   // If you want to fetch server-side filtered categories (when user applied filters and not searching),
//   // you can enable this query. We'll skip it when searching.
//   const {
//     data: filteredCategoriesData,
//     isLoading: isFilterLoading,
//     isError: isFilterError,
//   } = useGetAllCategoryQuery(
//     { categoryIds, minPrice, maxPrice, isOnline, topRated, isCertified },
//     { skip: !!searchTerm || !filtersApplied }
//   )

//   // effect: set services depending on which data we have
//   useEffect(() => {
//     if (searchTerm) {
//       if (!isSearchLoading && !isSearchError && searchedCategoriesData) {
//         const categories = searchedCategoriesData?.data?.categories || []
//         const flattened = categories.flatMap(cat => cat.service ?? [])
//         setServices(flattened)
//         setCurrentPage(1)
//       } else if (isSearchError) {
//         setServices([])
//       }
//     } else if (filtersApplied && filteredCategoriesData) {
//       // when filters (not search) are applied and filtered data present
//       const categories = filteredCategoriesData?.data?.categories || []
//       const flattened = categories.flatMap(cat => cat.service ?? [])
//       setServices(flattened)
//       setCurrentPage(1)
//     } else {
//       // default: show certified services
//       if (!isCertifiedLoading && !isCertifiedError && certifiedServicesData) {
//         const svc = certifiedServicesData?.data?.result || []
//         setServices(svc)
//       } else if (isCertifiedError) {
//         setServices([])
//       }
//     }
//   }, [
//     searchTerm,
//     searchedCategoriesData,
//     filteredCategoriesData,
//     certifiedServicesData,
//     isSearchLoading,
//     isFilterLoading,
//     isCertifiedLoading,
//     isSearchError,
//     isFilterError,
//     isCertifiedError,
//     categoryIds, minPrice, maxPrice, isOnline, topRated, isCertified,
//   ])

//   // Loading UX
//   if (searchTerm && isSearchLoading) {
//     return (
//       <CustomContainer>
//         <Loading />
//       </CustomContainer>
//     )
//   }

//   if (!searchTerm && isCertifiedLoading && !filtersApplied) {
//     return (
//       <CustomContainer>
//         <Loading />
//       </CustomContainer>
//     )
//   }

//   if (!searchTerm && filtersApplied && isFilterLoading) {
//     return (
//       <CustomContainer>
//         <Loading />
//       </CustomContainer>
//     )
//   }

//   // empty / error handling
//   if ((!searchTerm && (isCertifiedError || services.length === 0) && !filtersApplied) ||
//       (searchTerm && (isSearchError || services.length === 0)) ||
//       (!searchTerm && filtersApplied && (isFilterError || services.length === 0))) {
//     return (
//       <CustomContainer>
//         <div className="py-8 text-center">
//           {searchTerm ? 'No service found' : filtersApplied ? 'No service found for applied filters' : 'No certified service found'}
//         </div>
//       </CustomContainer>
//     )
//   }

//   // pagination
//   const page_size = 10
//   const total = services.length
//   const start = (currentPage - 1) * page_size
//   const end = start + page_size
//   const pageItems = services.slice(start, end)

//   const onPageChange = (page) => {
//     setCurrentPage(page)
//   }

//   const onSearch = (q) => {
//     // no-op — your SearchWithFilter probably updates the URL / search params
//   }

//   return (
//     <CustomContainer>
//       <div>
//         <FlexibleBanner
//           bgSrc={hero}
//           variant="simple"
//           title="Certified Services"
//           subtitle="Trusted professional service packages verified by our experts."
//           overlayClass="bg-black/45"
//         />
//       </div>

//       <div className='flex flex-col md:flex-row gap-4 justify-between items-center mt-10 lg:mt-20'>
//         <div>
//           <Heading text="Certified Services" />
//         </div>

//         <div className="max-w-3xl">
//           <SearchWithFilter onSearch={onSearch} />
//         </div>
//       </div>

//       <hr className='text-[#D4D4D4] my-6' />

//       <div>
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//           {pageItems.map((s) => (
//             <PopularServiceCard key={s.id ?? s._id} service={s} />
//           ))}
//         </div>

//         <div className='mt-10 lg:mt-20'>
//           <CustomPagenation
//             total={total}
//             page_size={page_size}
//             current={currentPage}
//             onPageChange={onPageChange}
//           />
//         </div>
//       </div>
//     </CustomContainer>
//   )
// }


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
import { useSearchParams } from 'next/navigation'
import { useGetAllCategoryQuery, useGetSearchedServicesQuery } from '@/redux/api/categoryApi'
import { useSelector } from 'react-redux'

export default function ServicesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [services, setServices] = useState([])

  const searchParams = useSearchParams()
  const searchTerm = (searchParams.get('searchTerm') || '').trim()

  // ensure selectors have safe defaults
  const categoryIds = useSelector((state) => state.filter?.categoryIds ?? [])
  const minPrice = useSelector((state) => state.filter?.minPrice )
  const maxPrice = useSelector((state) => state.filter?.maxPrice )
  const isOnline = useSelector((state) => state.filter?.isOnline )
  const topRated = useSelector((state) => state.filter?.topRated )
  const isCertified = useSelector((state) => state.filter?.isCertified )

  // certified services (skip when searching)
  const {
    data: certifiedServicesData,
    isLoading: isCertifiedLoading,
    isError: isCertifiedError,
  } = useGetCertifiedServicesQuery(undefined, { skip: !!searchTerm })

  // dedicated search endpoint (only when searchTerm exists)
  const {
    data: searchedCategoriesData,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useGetSearchedServicesQuery(searchTerm, { skip: !searchTerm })

  // BUILD filtersApplied and params — note: only include booleans when they are true
  const filtersApplied =
    Boolean(searchTerm) ||
    (Array.isArray(categoryIds) && categoryIds.length > 0) ||
    Boolean(minPrice) ||
    Boolean(maxPrice) ||
    isOnline === true ||
    topRated === true ||
    isCertified === true

  // Build params object while omitting false booleans
  const filterParams = {};
  if (Array.isArray(categoryIds) && categoryIds.length > 0) filterParams.categoryIds = categoryIds;
  if (minPrice !== undefined && minPrice !== null && minPrice !== '') filterParams.minPrice = minPrice;
  if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') filterParams.maxPrice = maxPrice;
  if (isOnline === true) filterParams.isOnline = true;
  if (topRated === true) filterParams.topRated = true;
  if (isCertified === true) filterParams.isCertified = true;

  // Use getAllCategoryQuery for server-side filters (skipped when searching or no filters)
  const {
    data: filteredCategoriesData,
    isLoading: isFilterLoading,
    isError: isFilterError,
  } = useGetAllCategoryQuery(filterParams, { skip: !!searchTerm || !filtersApplied })

  // effect: set services depending on which data we have
  useEffect(() => {
    if (searchTerm) {
      if (!isSearchLoading && !isSearchError && searchedCategoriesData) {
        const categories = searchedCategoriesData?.data?.categories || []
        const flattened = categories.flatMap(cat => cat.service ?? [])
        setServices(flattened)
        setCurrentPage(1)
      } else if (isSearchError) {
        setServices([])
      }
    } else if (filtersApplied && filteredCategoriesData) {
      const categories = filteredCategoriesData?.data?.categories || []
      const flattened = categories.flatMap(cat => cat.service ?? [])
      setServices(flattened)
      setCurrentPage(1)
    } else {
      if (!isCertifiedLoading && !isCertifiedError && certifiedServicesData) {
        const svc = certifiedServicesData?.data?.result || []
        setServices(svc)
      } else if (isCertifiedError) {
        setServices([])
      }
    }
  }, [
    searchTerm,
    searchedCategoriesData,
    filteredCategoriesData,
    certifiedServicesData,
    isSearchLoading,
    isFilterLoading,
    isCertifiedLoading,
    isSearchError,
    isFilterError,
    isCertifiedError,
    // keep dependencies that affect params
    JSON.stringify(categoryIds),
    minPrice,
    maxPrice,
    isOnline,
    topRated,
    isCertified,
  ])

  // Loading UX
  if (searchTerm && isSearchLoading) {
    return (
      <CustomContainer>
        <Loading />
      </CustomContainer>
    )
  }

  if (!searchTerm && isCertifiedLoading && !filtersApplied) {
    return (
      <CustomContainer>
        <Loading />
      </CustomContainer>
    )
  }

  if (!searchTerm && filtersApplied && isFilterLoading) {
    return (
      <CustomContainer>
        <Loading />
      </CustomContainer>
    )
  }

  // empty / error handling
  if ((!searchTerm && (isCertifiedError || services.length === 0) && !filtersApplied) ||
      (searchTerm && (isSearchError || services.length === 0)) ||
      (!searchTerm && filtersApplied && (isFilterError || services.length === 0))) {
    return (
      <CustomContainer>
        <div className="py-8 text-center">
          {searchTerm ? 'No service found' : filtersApplied ? 'No service found for applied filters' : 'No certified service found'}
        </div>
      </CustomContainer>
    )
  }

  // pagination
  const page_size = 10
  const total = services.length
  const start = (currentPage - 1) * page_size
  const end = start + page_size
  const pageItems = services.slice(start, end)

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  const onSearch = (q) => {
    // no-op — your SearchWithFilter probably updates the URL / search params
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
