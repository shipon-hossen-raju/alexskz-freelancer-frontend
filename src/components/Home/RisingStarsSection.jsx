import { useGetRisingStarsQuery } from "@/redux/api/publicApi";
import FreelancerCard from "../Home/FreelancerCard";
import NoDataFount from "../notFount/NoDataFount";
import Loading from "../shared/Loading";
import SectionContainer from "../shared/SectionContainer";

export default function RisingStarsSection({ heading, limit = 4 }) {
  const { data, isLoading, isError, error } = useGetRisingStarsQuery();
  const pros = data?.data || [];

  const items = pros.slice(0, limit);
  return (
    <div>
      <SectionContainer
        heading={heading}
        // title="New comers"
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {items?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {items?.map((p) => (
                  <FreelancerCard key={p.id} professional={p} />
                ))}
              </div>
            ) : (
              <NoDataFount text="Rising data not found" />
            )}
          </>
        )}
      </SectionContainer>
    </div>
  );
}
