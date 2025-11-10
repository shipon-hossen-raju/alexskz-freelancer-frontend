
import React, { useState } from 'react'
import Image from 'next/image'
import Paragraph from '../ui/Paragraph'
import arrow from '@/assets/icons/arrow-right.svg'
import edit from '@/assets/icons/edit.svg'
import trash from '@/assets/icons/trash.svg'
import PortfolioViewModal from '../modals/PortfolioViewModal'

export default function PortfolioCard({
    id,
    title,
    description,
    imgSrc,
    imgAlt,
    showPlay = false,

    onEdit = () => { },
    onDelete = () => { },
    profile = false

}) {
    const [open, setOpen] = useState(false);

    
    return (
        <article className="flex flex-col  overflow-hidden">


            {/* image */}
            <div className='relative   ' style={{
                // background: 'linear-gradient(135deg, rgba(254,99,110,0.85) 0%, rgba(251,140,0,0.85) 100%)',

            }}>
                <Image src={imgSrc} alt="image" className="rounded-[10px]" />

                {showPlay && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            aria-label="Play"
                            className="cursor-pointer bg-white/90 w-14 h-14 rounded-full flex items-center justify-center shadow-md focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-teal-600" fill="currentColor">
                                <path d="M5 3v18l15-9z" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>


            {/* content */}
            <div className=" pb-4 pt-4 flex-1 flex flex-col">
                <h3 className="text-[18px] font-semibold text-gray-800 font-open-sans">{title}</h3>
                <p className="mt-4  text-[#9F9C96] leading-relaxed flex-1 font-open-sans">{description}</p>


                <div className="mt-4 flex items-center justify-between">
                    <button
                        onClick={() => setOpen(true)}
                        className="cursor-pointer text-gray-600 font-open-sans font-medium inline-flex items-center gap-2 focus:outline-none"
                    >
                        <span className='text-xl'>View</span>
                        <Image src={arrow} alt="icon" />
                    </button>

                    {
                        profile && (
                            <div className="flex items-center gap-3">
                                <button onClick={() => onEdit(id)} aria-label={`Edit ${title}`} className="cursor-pointer p-1 rounded-md hover:bg-gray-100 focus:outline-none">
                                    <Image src={edit} alt="icon" />

                                </button>

                                <button onClick={() => onDelete(id)} aria-label={`Delete ${title}`} className="cursor-pointer p-1 rounded-md hover:bg-gray-100 focus:outline-none">
                                    <Image src={trash} alt="icon" />
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>

            <PortfolioViewModal
                open={open}
                onClose={() => setOpen(false)}
                images={[
                    imgSrc,
                    imgSrc
                ]}
            />
        </article>
    )
}


