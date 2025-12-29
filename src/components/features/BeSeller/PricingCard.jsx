"use client";

import { useCreateSubscriptionMutation } from "@/redux/api/subscriptionApi";
import { setPaymentId } from "@/redux/auth/userSlice";
import { useRouter } from "next/navigation";
import {
  useDispatch,
  useSelector,
} from "node_modules/react-redux/dist/react-redux";
import toast from "react-hot-toast";

export default function PricingCard({ plan }) {
  const userId = useSelector((state) => state.user?.user?.id ?? null);
  const subscriptionId = plan?.id;
  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  console.log("userId in pricing card", userId);

  const handleSubscribe = async () => {
    if (!userId) {
      router.push("/sign-in");
    }

    if (userId && subscriptionId) {
      const payload = {
        userId: userId,
        subscriptionId: subscriptionId,
      };
      await createSubscription(payload)
        .unwrap()
        .then((res) => {
          // console.log('subscription res', res)
          dispatch(setPaymentId(res?.data?.paymentId));
          router.push(`${res?.data?.sessionId}`);
        })
        .catch((err) => {
          // console.log('subscription err', err)
          toast.error(err?.data?.message || "Subscription failed");
        });
    }
  };

  // console.log('userId in pricing card', userId)
  // console.log('plan in pricing card', plan?.id)
  return (
    <div
      className={[
        "rounded-xl bg-white shadow-lg ring-1 ring-black/5 font-open-sans",
        "p-5 sm:p-6 w-full",
        "transform-gpu will-change-transform",
        "transition-transform duration-200 ease-out",
        "hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl flex-col justify-between flex",
      ].join(" ")}
    >
      <div>
        {/* Header */}
        <h3 className="text-[18px] sm:text-[24px] font-semibold text-gray-900">
          {plan.title}
        </h3>
        <p className="mt-1 text-[13px] text-gray-500 leading-5">
          {plan.description}
        </p>

        {/* Features */}
        <div className="mt-5">
          <div className="text-[16px] font-semibold text-gray-700 mb-2">
            This plan includes:
          </div>
          <ul className="space-y-3">
            {plan.features.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[13px] text-gray-600 leading-5"
              >
                <svg
                  className="mt-[2px] h-6 w-6 text-[#61C792] shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="">
        {/* Price */}
        <div className="mt-4 flex items-baseline gap-2">
          <div className="text-[28px] sm:text-[30px] font-bold text-gray-900">
            {plan.price} MXN
          </div>
          <span className="text-[13px] text-gray-600">/ {plan.type}</span>
        </div>

        {/* Billed note */}
        <div className="mt-1 text-[12px] text-gray-500">{plan.billedText}</div>

        {/* CTA */}
        <div className=" mt-4">
          <button
            onClick={handleSubscribe}
            // href={BeSeller? 'sign-up' : plan?.title === 'Launch — Get started'? '/sign-in' : `/payment/${plan.id}`}
            className="block cursor-pointer bg-[#144A6C] text-white font-open-sans font-semibold !w-full py-2 text-center 2xl:text-[18px] rounded-[6px]"
            disabled={isLoading && subscriptionId}
          >
            {isLoading && subscriptionId ? (
              "Loading..."
            ) : (
              <>
                {plan?.title === "Launch — Get started"
                  ? "Get started free"
                  : plan?.title === "Scale — Operate smarter"
                  ? "Upgrade to Scale"
                  : "Upgrade to Pro"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
