import React from 'react'
import Heading from '../ui/Heading'

export default function SectionContainer({ title, heading, children }) {
    return (
      <div className="container mx-auto px-4  mt-10 md:mt-20">
        {/* Eyebrow */}
        {title && (
          <div className="mb-4">
            <span className="inline-block text-[18px] font-medium text-[#144A6C] relative pl-3 font-open-sans">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] bg-[#144A6C]" />
              {title}
            </span>
          </div>
        )}

        {/* Title */}
        <div className="mb-8">
          <Heading text={heading} />
        </div>

        {children}
      </div>
    );
}
