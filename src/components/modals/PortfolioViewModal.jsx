// components/CaseStudyModal.jsx
'use client';

import React from 'react';
import { Modal } from 'antd';
// If you use Next.js, uncomment the next line and replace <img> with <Image>
import Image from 'next/image';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';

export default function PortfolioViewModal({
  open,
  onClose,
  title = 'Legal Consultancy Website Design',
  date = '17 Oct, 2025',
  description = `Designed a modern, user-friendly website for a law firm, improving user experience and boosting client inquiries.Designed a modern, user-friendly website for a law firm, improving user experience and boosting client inquiries.Designed a modern, user-friendly website for a law firm, improving user experience and boosting client inquiries.`,
  images = [], // e.g. ['/assets/case1.png', '/assets/case1.png']
}) {
  const screenshot = images[0] || '/assets/placeholder-case.png';

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={1040}
      maskClosable
      styles={{
        content: {
          borderRadius: 10,
          padding: 0,
          boxShadow: '0 24px 80px rgba(0,0,0,0.28)',
          overflow: 'hidden',
          background: '#ffffff',
        },
        body: { padding: 0 },
      }}
      className="case-study-modal"
    >
      {/* Body */}
      <div className="w-full">
        {/* Top: Title + date */}
        <div className="flex items-start justify-between gap-4 px-6  md:px-8 pt-16">
          <div className="flex-1">
            <Heading text={title} />
          </div>
          <span className="text-xs md:text-sm text-gray-500 select-none pt-1">
            {date}
          </span>
        </div>

        {/* Description */}
        <div className="px-6 md:px-8 pt-4">
          <Paragraph text={description} />
        </div>

        {/* Canvas area (light background like screenshot) */}
        <div className="px-4 md:px-6 pb-6 md:pb-8 pt-6">
         {
            images.map((image) =>(
                 <div className='relative mb-6   ' style={{
                                // background: 'linear-gradient(135deg, rgba(254,99,110,0.85) 0%, rgba(251,140,0,0.85) 100%)',
                                
                            }}>
                                <Image src={image} alt="image" className="rounded-[10px]" />
                
                                  
                          </div>
            ))
         }
         
        </div>
      </div>
    </Modal>
  );
}
