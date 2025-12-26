"use client";
import Loading from "@/components/shared/Loading";
import CustomContainer from "@/components/ui/CustomContainer";
import SubHeadingBlack from "@/components/ui/SubHeadingBlack";
import TealBtn from "@/components/ui/TealBtn";
import TealOutLineBtn from "@/components/ui/TealOutLineBtn";
import {
  useGetMySubscriptionQuery,
  useRenewSubscriptionMutation,
} from "@/redux/api/subscriptionApi";
import { Divider } from "antd";
import Link from "next/link";

export default function SubscriptionCard() {
  const { data, isLoading } = useGetMySubscriptionQuery();
  const [renewSubscription, { isLoading: isRenewLoading }] =
    useRenewSubscriptionMutation();

  const subscription = data?.data;

  const startDate = dateFormat(subscription?.startDate);
  const endDate = dateFormat(subscription?.endDate);
  const planName = subscription?.planTitle;
  const status = subscription?.status;
  const isCancelled = subscription?.isCancel;

  // handle renew subscription
  const handleRenew = async () => {
    console.log("renew");
    try {
      const res = await renewSubscription(subscription?.id).unwrap();
      console.log("res ", res);
      window.location.href = res?.data;
    } catch (error) {
      console.log("handleRenew error ", error);
    }
  };

  // handle cancel subscription
  const handleCancel = () => {
    console.log("cancel");
  };

  return (
    <CustomContainer>
      {/* links */}
      <div className="mb-8">
        <Link href="/profile" className="font-nunito text-gray-400 font-medium">
          Profile
        </Link>
        <Divider type="vertical" />
        <Link href="" className="font-nunito text-gray-700 font-medium">
          Subscription
        </Link>
      </div>

      <div className="bg-white rounded-[12px] shadow-[0_12px_34px_rgba(0,0,0,0.06)] p-8 max-w-[720px] mx-auto">
        {/* Title (keep your SubHeadingBlack as requested) */}
        <div className="text-center mb-6">
          <SubHeadingBlack text="Subscription" />
        </div>

        {/* Inner card */}
        <div className="bg-white rounded-lg md:border md:border-[#EEF1F2] shadow-[inset_0_1px_0_rgba(0,0,0,0.02)] md:p-16">
          {isLoading ? (
            <Loading />
          ) : subscription ? (
            <div className="flex items-start justify-between">
              <div className="flex-1 ">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-[#202020] font-medium text-lg">
                      {planName}
                    </h4>
                  </div>

                  {/* Status pill */}
                  <div>
                    <span className="inline-block text-[12px] bg-[#E9FFF1] text-[#2DAE64] px-3 py-1 rounded-full font-medium">
                      {status}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 text-sm text-[#879197]">
                  <div className="flex items-center justify-between">
                    <div>Start date :</div>
                    <div className="text-[#B7BFC1]">{startDate}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>Renewal date :</div>
                    <div className="text-[#B7BFC1]">{endDate}</div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex items-center gap-4">
                  {isCancelled ? <p className="text-sm text-[#879197] font-medium"> Already Cancelled</p> : ""}

                  {/* Keep TealBtn unchanged for Renew Now button */}
                  <div className="ml-auto">
                    <TealBtn text="Renew Now" onClick={() => handleRenew()} />
                  </div>
                </div>
              </div>

              {/* Decorative right padding to mimic image whitespace */}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Link
                href="/start-selling"
                // className="!border !border-gray-300 !p-2 !rounded-lg !bg-gray-100"
                className="block cursor-pointer bg-[#144A6C] text-white font-open-sans font-semibold px-10 py-2 text-center 2xl:text-[18px] rounded-[6px]"
              >
                Get started with a plan
              </Link>
            </div>
          )}
        </div>
      </div>
    </CustomContainer>
  );
}

function dateFormat(data) {
  const date = new Date(data);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day} | ${month} | ${year}`;
}
