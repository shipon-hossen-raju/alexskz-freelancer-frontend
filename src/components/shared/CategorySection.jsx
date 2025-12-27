"use client";

import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import NoDataFount from "../notFount/NoDataFount";
import CategoryCard from "./CategoryCard";
import Loading from "./Loading";
import SectionContainer from "./SectionContainer";

export default function CategoriesSection({ heading }) {
  const {
    data: categoriesData,
    isLoading,
  } = useGetAllCategoryQuery();

  const categories = categoriesData?.data?.categories || [];

  return (
    <section className="">
      <SectionContainer
        heading={heading}
        // title="Categories"
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {/* Grid */}
            {categories?.length > 0 ? (
              <div className=" grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6" >
                {categories.map((c) => (
                  <CategoryCard
                    key={c.id}
                    category = {c}
                  />
                ))}
              </div>
            ) : (
              <NoDataFount />
            )}
          </>
        )}
      </SectionContainer>
    </section>
  );
}
