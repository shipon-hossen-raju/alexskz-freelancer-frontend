'use client';

import Image from "node_modules/next/image";
import Link from "next/link";
import GenerateSlug from "../ui/GenerateSlug";

export default function CategoryCard({ category }) {
  // const slug = GenerateSlug(title);
  // console.log('slug', slug)

  const handleSetSlug = () => {
    localStorage.setItem("slug", id);
  };
  const slug = category?.slug;
  const icon = category?.icon;
  const title = category?.title;
  return (
    <Link
      href={`/category/${slug}`}
      onClick={handleSetSlug}
      className="
        group w-full
        rounded-xl border border-gray-200 bg-white
        shadow-lg hover:shadow-md
        transition-all duration-200
        px-4 py-5
        text-left
      
        hover:bg-[#def5e2]
      "
    >
      <div className="flex flex-col items-start gap-3 ">
        <div className="relative w-full aspect-[4/3] rounded overflow-hidden ">
          <Image src={icon} alt={title} fill className="object-cover" />
        </div>

        <div className="flex-1">
          <h3
            className="
              text-[15px] font-semibold text-gray-800 font-open-sans"
          >
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
