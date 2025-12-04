

'use client';

import { useState } from 'react';
import { SearchOutlined, SlidersOutlined } from '@ant-design/icons';
import FiltersModal from '../modals/FiltersModal';
import CustomSearch from './CustomSearch';

export default function SearchWithFilter({ onSearch }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);

  const submit = (e) => {
    e?.preventDefault();
    onSearch?.(q.trim());
  };

  return (
    <div div className="font-open-sans flex flex-col gap-4 md:flex-row items-center md:gap-2 w-full">
    <CustomSearch />
      <form
        onSubmit={submit}
      >


        {/* <div className="flex items-center bg-white rounded-[8px] shadow ring-1 ring-black/5 w-full h-10 lg:h-12">
           <span className="pl-4 pr-2 text-gray-500">
             <SearchOutlined />
        </span>

           <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Any Service..."
            aria-label="Search Any Service"
            className="flex-1 bg-transparent outline-none text-[14px] sm:text-[15px] text-gray-800 placeholder:text-gray-400"
          />

          <button
            type="button"
            aria-label="Open filters"
           
            className="shrink-0 mx-2 h-8 w-8 grid place-items-center  text-gray-500 "
          >
            <SlidersOutlined className="text-[16px]" />
          </button>
        </div> */}
        


        {/* Separate Filter button (opens modal) */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            inline-flex items-center gap-2 h-10 lg:h-12
            rounded-[8px] bg-white shadow ring-1 ring-black/5
            px-3 sm:px-4 text-[14px] text-gray-700 hover:bg-gray-50
            cursor-pointer
          "
          aria-label="Open filters"
        >
          <span className="inline-flex items-center gap-2">
            <SlidersOutlined className="text-[16px]" />
            <span>Filter</span>
          </span>
        </button>
      </form>

    

      {/* Modal */}
      <FiltersModal
        open={open}
        onClose={() => setOpen(false)}
        onApply={() => setOpen(false)}
      />
    </div>
  );
}
