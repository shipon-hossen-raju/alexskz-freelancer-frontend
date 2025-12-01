
'use client'
import PortfolioCard from '@/components/shared/PortfolioCard'
import React from 'react'

import img from '@/assets/image/freelancer/portfolio.jpg'
import Heading from '@/components/ui/Heading'
import Link from 'node_modules/next/link'

export default function PortfolioSection({ items = [] }) {
    const demo = [
        {
            id: 1,
            title: 'Legal Consultancy Website Design',
            description:
                'Designed a modern, user-friendly website for a law firm, improving user experience and boosting client inquiries.',
            imgSrc: img,
            showPlay: false,
        },
        {
            id: 2,
            title: 'Legal Consultancy Website Design',
            description:
                'Designed a modern, user-friendly website for a law firm, improving user experience and boosting client inquiries.',
            imgSrc: img,
            showPlay: false,
        },
        {
            id: 3,
            title: 'Legal Consultancy Website Design',
            description:
                'Designed a modern, user-friendly website for a law firm, improving user experience and boosting client inquiries.',
            imgSrc: img,
            showPlay: false,
        },
        {
            id: 4,
            title: 'Legal Consultancy Website Design',
            description:
                'Designed a modern, user-friendly website for a law firm, improving user experience and boosting client inquiries.',
            imgSrc: img,
            showPlay: true,
        },
    ]

    const list = items.length ? items : demo

    return (
        <section className=" ">
            <div>
                <Heading text="Portfolio" />
            </div>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 lg:mt-14">
                {list.map((it) => (
                    <PortfolioCard
                        key={it.id}
                        id={it.id}
                        title={it.title}
                        description={it.description}
                        imgSrc={it.imgSrc}
                        imgAlt={it.title}
                        showPlay={it.showPlay}
                        // onView={(id) => console.log('view', id)}
                        // onEdit={(id) => console.log('edit', id)}
                        // onDelete={(id) => console.log('delete', id)}
                    />
                ))}
            </div>

            
           
        </section>
    )
}
