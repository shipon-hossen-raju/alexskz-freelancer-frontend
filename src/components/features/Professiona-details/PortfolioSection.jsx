
'use client'
import PortfolioCard from '@/components/shared/PortfolioCard'
import React from 'react'

import img from '@/assets/image/freelancer/portfolio.jpg'
import Heading from '@/components/ui/Heading'
import Link from 'node_modules/next/link'

export default function PortfolioSection({ items  }) {
   
    const list = items.length > 0 ? items : []
    if(list.length === 0){
        return <div>No portfolio projects found</div>
    }

    return (
        <section className=" ">
            <div>
                <Heading text="Portfolio" />
            </div>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 lg:mt-14">
                {list.map((it) => (
                    <PortfolioCard
                        key={it.id}
                        project={it}
                        
                    />
                ))}
            </div>

            
           
        </section>
    )
}
