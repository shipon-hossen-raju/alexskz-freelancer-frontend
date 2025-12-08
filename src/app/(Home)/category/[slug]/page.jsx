'use client'
import FreelancerCard from '@/components/Home/FreelancerCard';
import CustomContainer from '@/components/ui/CustomContainer';
import Heading from '@/components/ui/Heading';
import React, { useState } from 'react'
import p1 from '@/assets/image/freelancer.jpg';
import CustomPagenation from '@/components/shared/CustomPagenation';
import Paragraph from '@/components/ui/Paragraph';
import SearchWithFilter from '@/components/ui/SearchWithFilter';
import { Divider } from 'antd'
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useGetServicesByCategoryIdQuery } from '@/redux/api/categoryApi';
import Loading from '@/components/shared/Loading';
 
export default  function CategoryPage({ params }) {
    const { slug } =  params;
    // console.log('s',slug)


    const savedSlug = localStorage.getItem("slug")
    const {data: categoryServices, isLoading: isCategoryServiceLoading, error: categoryServiceError} = useGetServicesByCategoryIdQuery(slug);

    if(slug !== savedSlug)
    {
       return notFound();
    }

    else if(isCategoryServiceLoading){
        return <Loading />
    }

    // console.log('category services: ', categoryServices)

    const total =categoryServices?.data?.categories[0].service?.length || 0;
    const categoryTitle = categoryServices?.data?.categories[0].title;

    const pros = categoryServices?.data?.categories[0].service || [];

    const [currentPage, setCurrentPage] = useState(1)


    const page_size = 8;

    const onPageChange = (page) => {
        setCurrentPage(page)
    }

    // const total = pros.length;
    const start = (currentPage - 1) * page_size
    const end = start + page_size
    const pageItems = pros.slice(start, end)

    
    const onSearch = (q) => {
        // console.log('search:', q);
        
    };



    return (
        <CustomContainer>
            {/* Links */}
            <div>
                <Link href="/" className="font-nunito text-gray-400 font-medium">Home</Link>
                 <Divider type="vertical" />
                 <Link href={`/${slug}`} className="font-nunito text-gray-700 font-medium">Category</Link>
            </div>

            <div className='flex flex-col md:flex-row gap-4 justify-between items-center mt-10 lg:mt-12'>
                            <div>
                               <Paragraph text={`${total} results`}/>
                            </div>
            
                            <div className="max-w-3xl">
                                {/* <SearchWithFilter onSearch={onSearch} /> */}
                                <SearchWithFilter />
                            </div>
                        </div>
            
                        <hr className='text-[#D4D4D4] my-6' />

            {/* Heading */}
            <div>
                <Heading text={categoryTitle} />
            </div>

            {/*  */}
            <div className='mt-10'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pageItems.map((p) => (<FreelancerCard key={p.id} professional={p} />))}
                </div>

                {/* Pagenation */}

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
