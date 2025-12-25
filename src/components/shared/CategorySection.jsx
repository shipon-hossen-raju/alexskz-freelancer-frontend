"use client";

import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import NoDataFount from "../notFount/NoDataFount";
import CategoryCard from "./CategoryCard";
import SectionContainer from "./SectionContainer";

export default function CategoriesSection({ heading }) {
  const {
    data: categoriesData,
    isLoading,
    isError,
    error,
  } = useGetAllCategoryQuery();
  if (isLoading) {
    return <p>Loading Categories...</p>;
  }
  const categories = categoriesData?.data?.categories;
  // if (isError) {
  //   return <p></p>;
  // }

  // console.log(categories)
  return (
    <section className="">
      <SectionContainer heading={heading} title="Categories">
        {/* Grid */}

        {categories?.length > 0 ? (
          <div
            className="
            grid gap-4 sm:gap-5
            grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
          "
          >
            {categories.map((c) => (
              <CategoryCard
                key={c.id}
                title={c.title}
                icon={c.icon}
                id={c.id}
              />
            ))}
          </div>
        ) : (
          <NoDataFount />
        )}
      </SectionContainer>
    </section>
  );
}
