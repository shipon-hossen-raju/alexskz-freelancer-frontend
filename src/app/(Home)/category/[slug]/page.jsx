// "use client";

// import { useParams } from "next/navigation";
// import FreelancerCard from "@/components/Home/FreelancerCard";
// import CustomPagenation from "@/components/shared/CustomPagenation";
// import Loading from "@/components/shared/Loading";
// import CustomContainer from "@/components/ui/CustomContainer";
// import Heading from "@/components/ui/Heading";
// import Paragraph from "@/components/ui/Paragraph";
// import SearchWithFilter from "@/components/ui/SearchWithFilter";
// import { useGetServicesByCategoryIdQuery } from "@/redux/api/categoryApi";
// import { Divider } from "antd";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function CategoryPage() {
//     const [currentPage, setCurrentPage] = useState(1);
//   const { slug } = useParams(); // Access slug safely

//   if (!slug) {
//     return notFound(); // Handle missing slug
//   }

//   const {
//     data: categoryServices,
//     isLoading: isCategoryServiceLoading,
//     error: categoryServiceError,
//   } = useGetServicesByCategoryIdQuery(slug, {
//     refetchOnMountOrArgChange: !slug,
//   });

//   if (isCategoryServiceLoading) {
//     return <Loading />;
//   }

//   const total = categoryServices?.data?.categories[0].service?.length || 0;
//   const categoryTitle = categoryServices?.data?.categories[0].title;
//   const pros = categoryServices?.data?.categories[0].service || [];
//   const page_size = 8;

//   const onPageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const start = (currentPage - 1) * page_size;
//   const end = start + page_size;
//   const pageItems = pros.slice(start, end);

//   return (
//     <CustomContainer>
//       {/* Links */}
//       <div>
//         <Link href="/" className="font-nunito text-gray-400 font-medium">
//           Home
//         </Link>
//         <Divider type="vertical" />
//         <Link
//           href={`/${slug}`}
//           className="font-nunito text-gray-700 font-medium"
//         >
//           Category
//         </Link>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-10 lg:mt-12">
//         <div>
//           <Paragraph text={`${total} results`} />
//         </div>

//         <div className="max-w-3xl">
//           <SearchWithFilter />
//         </div>
//       </div>

//       <hr className="text-[#D4D4D4] my-6" />

//       {/* Heading */}
//       <div>
//         <Heading text={categoryTitle} />
//       </div>

//       {/*  */}
//       <div className="mt-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {pageItems.map((p) => (
//             <FreelancerCard key={p.id} professional={p} />
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="mt-10 lg:mt-20">
//           <CustomPagenation
//             total={total}
//             page_size={page_size}
//             current={currentPage}
//             onPageChange={onPageChange}
//           />
//         </div>
//       </div>
//     </CustomContainer>
//   );
// }

"use client";

import FreelancerCard from "@/components/Home/FreelancerCard";
import NoDataFount from "@/components/notFount/NoDataFount";
import CustomPagination from "@/components/shared/CustomPagination";
import Loading from "@/components/shared/Loading";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomSearch from "@/components/ui/CustomSearch";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { useGetServicesByCategorySlugQuery } from "@/redux/api/categoryApi";
import { Divider } from "antd";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CategoryPage({ params }) {
  const filtered = useSelector((state) => state.filter);
  const [currentPage, setCurrentPage] = useState(1);
  const { slug } = params;
  if (!slug) {
    return notFound(); // Handle missing slug
  }

  console.log("filtered ", filtered);
  console.log("filtered?.searchTerm ", filtered?.searchTerm);
  const findFilteredData = [
    {
      name: "slug",
      value: slug,
    },
    {
      name: "searchTerm",
      value: filtered.searchTerm,
    },
    {
      name: "minPrice",
      value: filtered.minPrice,
    },
    {
      name: "maxPrice",
      value: filtered.maxPrice,
    },
    {
      name: "isOnline",
      value: filtered.isOnline,
    },
    {
      name: "topRated",
      value: filtered.topRated,
    },
  ];

  const {
    data: categoryServices,
    isLoading: isCategoryServiceLoading,
    error: categoryServiceError,
  } = useGetServicesByCategorySlugQuery(findFilteredData, {
    refetchOnMountOrArgChange: !slug,
  });

  console.log("categoryServices?.data ", categoryServices?.data);
  const total = categoryServices?.data?.categories[0]?.service?.length || 0;
  const categoryTitle = categoryServices?.data?.categories[0]?.title;

  const service = categoryServices?.data?.categories[0]?.service || [];

  const page_size = 10;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // const total = pros.length;
  const start = (currentPage - 1) * page_size;
  const end = start + page_size;
  const pageItems = service.slice(start, end);

  console.log("categoryTitle ", categoryTitle);

  const onSearch = (q) => {
    console.log("search:", q);
  };

  return (
    <CustomContainer>
      {/* Links */}
      <div>
        <Link href="/" className="font-nunito text-gray-400 font-medium">
          Home
        </Link>
        <Divider type="vertical" />
        <Link
          href={`/${slug}`}
          className="font-nunito text-gray-700 font-medium"
        >
          Category
        </Link>
        <Divider type="vertical" />
        {slug && (
          <Link href={`#`} className="font-nunito text-gray-700 font-medium">
            {/* first letter capital full */}
            {categoryTitle}
          </Link>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-10 lg:mt-12">
        <div>
          <Paragraph text={`${total} results`} />
        </div>

        <div className="max-w-4xl">
          {/* <SearchWithFilter onSearch={onSearch} /> */}
          <CustomSearch categorySlug={categoryTitle} />
        </div>
      </div>

      <hr className="text-[#D4D4D4] my-6" />

      {/* Heading */}
      <div>
        <Heading text={categoryTitle} />
      </div>

      {/*  */}
      {isCategoryServiceLoading ? (
        <Loading />
      ) : (
        <div className="mt-10">
          {pageItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pageItems.map((p) => (
                <FreelancerCard
                  key={p.id}
                  professional={p}
                  category={categoryTitle}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <NoDataFount text="No data found" />
            </div>
          )}

          {/* Pagination */}

          <div className="mt-10 lg:mt-20">
            <CustomPagination
              total={total}
              page_size={page_size}
              current={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </CustomContainer>
  );
}

function capitalizeFirstLetter(string) {
  if (string.length === 0) {
    return ""; // Handles empty strings
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
