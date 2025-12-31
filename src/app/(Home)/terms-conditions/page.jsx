"use client";
import Loading from "@/components/shared/Loading";
import CustomContainer from "@/components/ui/CustomContainer";
import Heading from "@/components/ui/Heading";
import { useGetTermsConditionsQuery } from "@/redux/api/legalApi";

export default function TermsConditionsPage() {
  const [isClient, setIsClient] = useState(false);
  const { data, isLoading } = useGetTermsConditionsQuery();

  // Check if the component is mounted (client-side)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Early return to prevent SSR issues if it's not on the client side
  if (!isClient || isLoading) {
    return <Loading />;
  }

  const content = data?.data?.content;

  return (
    <CustomContainer>
      <div className="space-y-4 lg:space-y-8">
        {/* Heading */}
        <div>
          <Heading text="Terms & Condition" />
        </div>

        {/* para one */}
        <div
          dangerouslySetInnerHTML={{
            __html: content || "No Terms & Conditions available.",
          }}
          className="text-justify"
        ></div>
      </div>
    </CustomContainer>
  );
}
