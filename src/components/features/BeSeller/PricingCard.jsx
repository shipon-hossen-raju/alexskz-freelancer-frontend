'use client';

import AuthButton from "@/components/ui/AuthButton";
import TealBtn from "@/components/ui/TealBtn";
import Link from "next/link";

export default function PricingCard({ plan, BeSeller = false }) {

    // console.log(plan)
    return (
        <div
            className={[
                'rounded-xl bg-white shadow-lg ring-1 ring-black/5 font-open-sans',
                'p-5 sm:p-6 w-full',
                'transform-gpu will-change-transform',
                'transition-transform duration-200 ease-out',
                'hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl flex-col justify-between flex',

            ].join(' ')}
        >
           <div>
             {/* Header */}
            <h3 className="text-[18px] sm:text-[24px] font-semibold text-gray-900">{plan.title}</h3>
            <p className="mt-1 text-[13px] text-gray-500 leading-5">{plan.blurb}</p>

           

            {/* Features */}
            <div className="mt-5">
                <div className="text-[16px] font-semibold text-gray-700 mb-2">AI Suite with:</div>
                <ul className="space-y-3">
                    {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-[13px] text-gray-600 leading-5">
                            
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
                    {plan.price} {plan.currency}
                </div>
                <span className="text-[13px] text-gray-600">/ {plan.period}</span>
            </div>

            {/* Billed note */}
            <div className="mt-1 text-[12px] text-gray-500">{plan.billedText}</div>

            {/* CTA */}
            <div className=" mt-4">
                <Link
            href={BeSeller? 'sign-up' : `/payment/${plan.id}`}
            className="block bg-[#144A6C] text-white font-open-sans font-semibold !w-full py-2 text-center 2xl:text-[18px] rounded-[6px]"
            >
                
                {plan.ctaText}
            </Link>
            </div>
            </div>
        </div>
    );
}
