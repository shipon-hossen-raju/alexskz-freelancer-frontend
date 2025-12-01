'use client';

import Image from 'next/image';

export default function TestimonialCard({  review }) {
  return (
    <div className="rounded-xl bg-white shadow-lg ring-1 ring-black/5 p-3 sm:p-4 h-50">
      <div className="flex gap-3 ">
        {/* Left: portrait */}
        <div className="w-[50%] h-40 rounded-md relative overflow-hidden">
          <Image
            src={review?.user?.profileImage}
            alt="testimonial author"
            fill
            className="object-cover"
            priority={false}
          />
        </div>

        {/* Right: content */}
        <div className="flex-1">
          {/* Stars */}
          <div className="flex items-center gap-1 text-[16px] leading-none mb-1.5">
            {Array.from({ length: review?.rating }).map((_, i) => (
              <span key={i} className="text-[#FFA726]">★</span>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="italic text-[13px] sm:text-[14px] leading-5 text-gray-700 font-open-sans">
            “{review?.experience}”
          </blockquote>

          {/* Author */}
          <p className="mt-2 text-[12px] text-gray-400 font-open-sans">
            {review?.user?.firstName} {review?.user?.lastName}, {review?.user?.jobTitle || ''}
          </p>
        </div>
      </div>
    </div>
  );
}
