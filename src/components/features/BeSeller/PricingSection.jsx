"use client";
import SectionContainer from "@/components/shared/SectionContainer";

import NoDataFount from "@/components/notFount/NoDataFount";
import Loading from "@/components/shared/Loading";
import { useGetAllSubscriptionQuery } from "@/redux/api/subscriptionApi";
import PricingCard from "./PricingCard";

export default function PricingSection({}) {
  const {
    data: subscriptionData,
    isLoading,
    error,
  } = useGetAllSubscriptionQuery();
  const pricingPlans = subscriptionData?.data;

  // console.log('plans', subscriptionData)

  return (
    <div>
      <SectionContainer heading="Plans for every Professional" title="Pricing">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : pricingPlans?.length > 0 && pricingPlans && !error ? (
          <div className="grid gap-10 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <NoDataFount />
        )}
      </SectionContainer>
    </div>
  );
}
