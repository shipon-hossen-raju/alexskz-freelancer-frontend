'use client';

import { Button } from 'antd';

export default function GreenBtn({ text, onClick = () => {}, icon = null, htmlType = 'submit' }) {
  return (
    <div className="gold-btn">
      <Button
        onClick={onClick}
        htmlType={htmlType}
        className="
          !bg-[#8BCF9A] !text-white !font-open-sans !border-none
          !rounded-[8px] !font-semibold
          !px-5 sm:!px-8   /* narrower padding on mobile */
          w-full sm:w-auto /* optional: full width on mobile */
        "
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
