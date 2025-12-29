"use client";
// import hero from "@/assets/image/serviceBG.png";
import hero from "@/assets/image/serviceBG.webp";
import PopularServiceCard from "@/components/features/explore/PopularServiceCard";
import CustomPagination from "@/components/shared/CustomPagination";
import FlexibleBanner from "@/components/shared/FlexibleBanner";
import Loading from "@/components/shared/Loading";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomSearch from "@/components/ui/CustomSearch";
import Heading from "@/components/ui/Heading";
import { useGetCertifiedServicesQuery } from "@/redux/api/serviceApi";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ServicesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  // ensure selectors have safe defaults
  const filtered = useSelector((state) => state.filter);
  // if filtered new data is available then refetch
  const {
    data: certifiedServicesData,
    isLoading: isCertifiedLoading,
    isError: isCertifiedError,
  } = useGetCertifiedServicesQuery(
    [
      {
        name: "limit",
        value: 10,
      },
      {
        name: "page",
        value: currentPage,
      },
      {
        name: "searchTerm",
        value: filtered?.searchTerm || "",
      },
      {
        name: "minPrice",
        value: filtered?.minPrice || null,
      },
      {
        name: "maxPrice",
        value: filtered?.maxPrice || null,
      },
      {
        name: "categoryIds",
        value: filtered?.categoryIds || null,
      },
      {
        name: "isOnline",
        value: filtered?.isOnline || null,
      },
      {
        name: "topRated",
        value: filtered?.topRated || null,
      },
      {
        name: "isCertified",
        value: filtered?.isCertified || null,
      },
      {
        name: "inPerson",
        value: filtered?.inPerson || null,
      },
    ],
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isCertifiedLoading) {
    return (
      <CustomContainer>
        <Loading />
      </CustomContainer>
    );
  }
  const services = certifiedServicesData?.data?.result ?? [];
  const meta = certifiedServicesData?.data?.meta ?? {};

  console.log("meta?.totalPage ", meta);

  // pagination
  const pageCount = meta?.totalPage || 0;
  const pageSize = meta?.limit || 5;
  const total = meta?.total || 0;
  const start = meta?.page;

  console.log("pageCount ", pageCount);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onSearch = (q) => {
    // no-op — your SearchWithFilter probably updates the URL / search params
  };

  return (
    <CustomContainer>
      <div>
        <FlexibleBanner
          bgSrc={hero}
          variant="simple"
          title="Certified services for your business"
          subtitle="Curated service packages designed by AliumPro and delivered in one-to-one sessions by vetted professionals."
          overlayClass="bg-black/10"
          actionText={"View package"}
          radius=""
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-10 lg:mt-20">
        <div>
          <Heading text="Certified Services" />
        </div>

        <div className="max-w-3xl">
          {/* <SearchWithFilter onSearch={onSearch} /> */}
          <CustomSearch />
        </div>
      </div>

      <hr className="text-[#D4D4D4] my-6" />

      <div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {services.map((s) => (
            <PopularServiceCard key={s.id ?? s._id} service={s} />
          ))}
        </div>

        <div className="mt-10 lg:mt-20">
          <CustomPagination
            total={total}
            page_size={pageSize}
            current={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </CustomContainer>
  );
}
