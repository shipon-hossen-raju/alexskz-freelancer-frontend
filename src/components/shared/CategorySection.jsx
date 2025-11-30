
'use client';

import Heading from '../ui/Heading';
import CategoryCard from './CategoryCard';
import financeIcon from '@/assets/icons/Finance.svg'
import SectionContainer from './SectionContainer';
import { useGetAllCategoryQuery } from '@/redux/api/categoryApi';





export default function CategoriesSection({heading}) {
  const {data: categoriesData, isLoading, isError, error} = useGetAllCategoryQuery();
  if(isLoading){
    return <p>Loading Categories...</p>
  }
  const categories = categoriesData?.data?.categories;
  if(isError || categories?.length === 0){
    return <p>No category found</p>
  }

  // console.log(categories)
  return (
    <section className="">
      

        <SectionContainer heading={heading} title="Categories">
            {/* Grid */}
        <div
          className="
            grid gap-4 sm:gap-5
            grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
          "
        >
          {categories.map((c) => (
            <CategoryCard key={c.id} title={c.title} icon={c.icon} />
          ))}
        </div>
        </SectionContainer>
      
    </section>
  );
}

