import { useGetTopRatedProfessionalQuery } from "@/redux/api/publicApi";
import NoDataFount from "../notFount/NoDataFount";
import CustomCarousel from "./CustomCarousel";
import Loading from "./Loading";
import SectionContainer from "./SectionContainer";

export default function FreelancerSection({ heading }) {
  const { data, isLoading } = useGetTopRatedProfessionalQuery();

  const pros = data?.data || [];

  return (
    <div>
      <SectionContainer
        heading={heading}
        //  title="Professional"
      >
        {isLoading ? (
          <Loading />
        ) : pros.length > 0 ? (
          <CustomCarousel items={pros} />
        ) : (
          <NoDataFount />
        )}
      </SectionContainer>
    </div>
  );
}
