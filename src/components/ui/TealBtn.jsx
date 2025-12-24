"use client";

import { Button } from "antd";

export default function TealBtn({
  text,
  onClick = () => {},
  icon = null,
  isLoading = false,
  className = "",
}) {
  return (
    <div className="gold-btn">
      <Button
        onClick={onClick}
        htmlType="submit"
        className={`${className ?? ""} !bg-[#144A6C] !text-white !font-open-sans !border-none !rounded-[8px] !font-semibold !px-5 sm:!px-8 w-full sm:w-auto 
        `}
        loading={isLoading}
      >
        {text} {icon}
      </Button>

      <style jsx>{`
        /* default (sm and up) */
        :global(.gold-btn .ant-btn) {
          font-size: 18px;
          height: 50px;
          line-height: 32px;
        }
        /* mobile only */
        @media (max-width: 767px) {
          :global(.gold-btn .ant-btn) {
            font-size: 14px;
            height: 38px;
            line-height: 24px;
          }
        }
      `}</style>
    </div>
  );
}
