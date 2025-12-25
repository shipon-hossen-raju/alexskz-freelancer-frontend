// components/RatingsHeader.jsx
'use client';
import React, { useState } from 'react';
import { Dropdown, Divider } from 'antd';
import { DownOutlined, StarFilled } from '@ant-design/icons';
import SubHeadingBlack from '@/components/ui/SubHeadingBlack';

function RatingsHeader({ total = 0, rating = 0, defaultSortKey = 'recent', onSortChange }) {
  const items = [
    { key: 'recent', label: 'Most Recent' },
    { key: 'relevant', label: 'Most Relevant' },

  ];

  const initialLabel = (items.find(i => i.key === defaultSortKey) || items[0]).label;
  const [selectedLabel, setSelectedLabel] = useState(initialLabel);

  const handleMenuClick = ({ key }) => {
    const label = (items.find(i => i.key === key) || items[0]).label;
    setSelectedLabel(label);
    if (onSortChange) onSortChange(key);
  };

  return (
    <section className="w-full">
      <div className="py-4">
        {/* Title */}
        <SubHeadingBlack text="Ratings & Review" />

        {/* Meta row */}
        <div className="mt-4 flex items-center justify-between">
          {/* Left: count + rating */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm sm:text-base font-semibold text-gray-900 font-open-sans">
              {total} Reviews
            </span>

            <span className="flex items-center gap-1 text-sm sm:text-base">
              <StarFilled className="!text-[#FFBA51]" />
              <span className="text-gray-700">{rating}</span>
            </span>
          </div>

          {/* Right: dropdown */}
          {
            // total > 0 && (
            //   <Dropdown
            //     trigger={['click']}
            //     menu={{ items, onClick: handleMenuClick }}
            //     placement="bottomRight"
            //   >
            //     <button
            //       className="cursor-pointer inline-flex items-center gap-2 font-medium text-gray-800 hover:text-gray-900"
            //       aria-label="Sort reviews"
            //     >
            //       {selectedLabel}
            //       <DownOutlined className="text-xs font-medium" />
            //     </button>
            //   </Dropdown>
            // )
          }
        </div>

        {/* Divider */}
        <Divider className="!my-4" />
      </div>
    </section>
  );
}

export default RatingsHeader;
