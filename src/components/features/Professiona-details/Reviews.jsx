'use client';

import Image from 'next/image';

export default function Reviews({ review }) {
  return (
    <div className="rounded-xl bg-white ring-1 ring-black/5 p-3 sm:p-4 border border-[#E5E5E5]">
      <div className="flex gap-3 items-center">
        {/* Left: portrait */}
        <div className="  ring-1 rounded-full w-30 h-30 ring-[#8BCF9A] ">
          <Image
            src={review?.user?.profileImage}
            alt="User Image"
            className="rounded-full w-30 h-30 object-cover"
            width={30}
            height={30}
            priority={false}
          />
        </div>

        {/* Right: content */}
        <div className="flex-1  ">
          <div className="  flex flex-col ">
            {/* Stars */}
            <div className="flex items-center gap-1 text-[16px] leading-none mb-1.5 ">
              {Array.from({ length: review?.rating }).map((_, i) => (
                <span key={i} className="text-[#FFA726]">
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="italic text-[13px] sm:text-[14px] leading-5 text-gray-700 font-open-sans">
              “{review?.experience}”
            </blockquote>

            {/* Author */}
            <p className="mt-2 text-[12px] text-gray-400 font-open-sans">
              {review?.user?.firstName} {review?.user?.lastName},{" "}
              {review?.user?.jobTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
