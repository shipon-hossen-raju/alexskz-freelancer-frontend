"use client";

import bgSrc from "@/assets/image/hero2.png";
// import bgSrc from "@/assets/image/hero2.svg";
import Image from "next/image";
import SearchField from "../shared/SearchField";

export default function BannerHero({ onSearch }) {
  return (
    <section className="relative  w-full h-[100vh] min-h-[520px]">
      {/* BG image fills the section */}
      <Image
        src={bgSrc}
        alt="Office city view"
        fill
        className="object-cover object-right"
      />

      {/* Soft left gradient to increase text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />

      {/* Content column */}
      <div className="relative z-10 h-full">
        <div className="mx-auto h-full w-full max-w-6xl px-4 md:px-6 flex items-center">
          <div className="w-full max-w-3xl ">
            {/* Heading — Open Sans */}
            <h1 className="font-open-sans text-black leading-[1.3] font-bold   text-[34px] sm:text-5xl md:text-[52px]  max-w-2xl">
              Hire the right professional to grow your business
            </h1>

            {/* Search row */}

            <div className="mt-5">
              <p className="font-medium">
                Find vetted experts in finance, HR, marketing and operations,
                all in one place.
              </p>
              <SearchField onSearch={onSearch} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
