import SectionContainer from "@/components/shared/SectionContainer";

import NoDataFount from "@/components/notFount/NoDataFount";
import Loading from "@/components/shared/Loading";
import { useGetPopularServicesQuery } from "@/redux/api/serviceApi";
import PopularServiceCard from "./PopularServiceCard";

export default function PopularServiceSection() {
  const {
    data: popularServices,
    isLoading,
    isError,
  } = useGetPopularServicesQuery();
  const services = popularServices?.data?.result || [];

  return (
    <div>
      <SectionContainer heading="Popular Services" title="Services">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {services?.length > 0 && !isError ? (
              services.map((s) => <PopularServiceCard key={s.id} service={s} />)
            ) : (
              <NoDataFount />
            )}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
