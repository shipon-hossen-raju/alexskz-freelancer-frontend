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
 
export const pros = [
    { id: 1, imgSrc: p1, name: 'Mr. Lee', category: 'Finance & Accounting', rating: 4.5, reviews: 500 },
    { id: 2, imgSrc: p1, name: 'Ava Kim', category: 'Marketing Strategy', rating: 4.8, reviews: 320 },
    { id: 3, imgSrc: p1, name: 'Noah Diaz', category: 'UI/UX Design', rating: 4.6, reviews: 210 },
    { id: 4, imgSrc: p1, name: 'Sara Ali', category: 'Web Development', rating: 4.7, reviews: 430 },
    { id: 5, imgSrc: p1, name: 'Ken Ito', category: 'Data Analytics', rating: 4.9, reviews: 190 },
    { id: 6, imgSrc: p1, name: 'Emma Roy', category: 'HR & Recruiting', rating: 4.4, reviews: 275 },
    { id: 7, imgSrc: p1, name: 'Emma Roy', category: 'HR & Recruiting', rating: 4.4, reviews: 275 },
    { id: 8, imgSrc: p1, name: 'Emma Roy', category: 'HR & Recruiting', rating: 4.4, reviews: 275 },
    { id: 9, imgSrc: p1, name: 'Emma Roy', category: 'HR & Recruiting', rating: 4.4, reviews: 275 },
    { id: 10, imgSrc: p1, name: 'Emma Roy', category: 'HR & Recruiting', rating: 4.4, reviews: 275 },
    { id: 11, imgSrc: p1, name: 'Emma Roy', category: 'HR & Recruiting', rating: 4.4, reviews: 275 },
    { id: 12, imgSrc: p1, name: 'Emma Roy', category: 'HR & Recruiting', rating: 4.4, reviews: 275 },
];

export default  function CategoryPage({ params }) {
    const { slug } =  params;
    console.log(slug)

    const savedSlug = localStorage.getItem("slug")

    if(slug !== savedSlug)
    {
        notFound();
    }

    console.log(savedSlug)

    const [currentPage, setCurrentPage] = useState(1)


    const page_size = 8;

    const onPageChange = (page) => {
        setCurrentPage(page)
    }

    const total = pros.length;
    const start = (currentPage - 1) * page_size
    const end = start + page_size
    const pageItems = pros.slice(start, end)

    
    const onSearch = (q) => {
        console.log('search:', q);
        
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
                               <Paragraph text="5000+ Results"/>
                            </div>
            
                            <div className="max-w-3xl">
                                <SearchWithFilter onSearch={onSearch} />
                            </div>
                        </div>
            
                        <hr className='text-[#D4D4D4] my-6' />

            {/* Heading */}
            <div>
                <Heading text="Finance & Accounting" />
            </div>

            {/*  */}
            <div className='mt-10'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pageItems.map((p) => (<FreelancerCard key={p.id} {...p} />))}
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
