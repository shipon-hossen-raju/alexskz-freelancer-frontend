"use client";

import { svgIcon } from "@/assets/iconSvg";
import Image from "next/image";
import Link from "next/link";
import VerifiedDot from "../ui/VerifiedDot";

export default function FreelancerCard({
  professional,
  category: categoryTitle,
}) {
  const isCategory = professional?.firstName;

  const thumbnail =
    professional?.profileImage || professional?.user?.profileImage;
  const isVerify = isCategory
    ? professional?.isVerify
    : professional?.user?.isVerify || false;
  const fullName = isCategory
    ? `${professional?.firstName ?? ""} ${professional?.lastName ?? ""}`
    : `${professional?.user?.firstName ?? ""} ${
        professional?.user?.lastName ?? ""
      }`;
  const rating = isVerify ? professional?.rating : 0;
  const ratingCount = isVerify ? professional?.ratingCount : 0;
  const category = isVerify ? professional?.category?.title : categoryTitle;
  const about = isVerify ? professional?.about : professional?.user?.about;
  const id = isVerify ? professional?.id : professional?.user?.id;

  return (
    <div className=" rounded-[8px] bg-white shadow-lg overflow-hidden  transition border border-gray-200">
      {/* Cover */}
      <Link href={`/details/${id}`}>
        <div className="relative h-48 ">
          <Image
            src={thumbnail}
            alt={fullName}
            fill
            className="object-cover"
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            priority={false}
          />
        </div>
      </Link>

      {/* Body */}
      <div className="px-4 py-3 flex flex-col items-start justify-between pb-15 relative">
        <div>
          {/* Top row: name + verified + rating */}
          <div className="">
            <Link href={`/details/${id}`}>
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-semibold text-[#202020] font-open-sans">
                  {fullName}
                </span>

                {isVerify && <VerifiedDot />}
              </div>
            </Link>

            <div className="flex items-center gap-1 text-[16px] text-gray-600">
              <span className="text-[#FFA726] ">★</span>
              <span className="font-medium">{rating}</span>
              <span className="text-gray-400">({ratingCount})</span>
            </div>
          </div>

          {/* Category link (green) */}
          <div className="mt-1">
            <button
              type="button"
              className="text-[14px] text-[#1e863a] bg-[#e7f3e9] underline decoration-transparent hover:decoration-[#1e863a] px-2 rounded font-medium"
            >
              {category}
            </button>
          </div>

          {/* Short description */}
          <p className="mt-2 text-[14px]  font-open-sans leading-5 text-[#9F9C96] line-clamp-2">
            {about}
          </p>
        </div>

        {/* Footer action */}
        <div className="absolute bottom-3 left-5">
          <Link
            href={`/details/${id}`}
            className="inline-flex font-open-sans items-center  text-[16px] font-medium text-gray-700 hover:text-[#1877b3]"
          >
            Contact now
            <span className="size-8" aria-hidden>
              {svgIcon?.arrow}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
