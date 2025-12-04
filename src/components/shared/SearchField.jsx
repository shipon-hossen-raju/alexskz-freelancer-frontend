

'use client';

import React, { useState } from 'react';
import TealBtn from '../ui/TealBtn';
import { SearchOutlined, SlidersOutlined } from '@ant-design/icons';
import CustomSearch from '../ui/CustomSearch';

export default function SearchField({ onSearch, className = '' }) {
  const [q, setQ] = useState('');

  const submit = (e) => {
    e?.preventDefault();
    onSearch?.(q.trim());
  };

  return (

    <div className={`mt-4 sm:mt-6 flex flex-col gap-4 md:gap-2 sm:flex-row sm:items-center ${className}`}>
      <div >
        <CustomSearch />
      </div>
      <form
      onSubmit={submit}
      
    >
      {/* Input shell */}
      {/* <label className="sr-only" htmlFor="global-search">Search Any Service</label>
      <div className="flex items-center bg-white rounded-[8px] shadow ring-1 ring-black/5 w-full h-10 md:h-12 ">
        <span className="pl-3 sm:pl-4 pr-2 text-gray-500 text-[16px] sm:text-[18px]">
          <SearchOutlined />
        </span>

        <input
          id="global-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search Any Service..."
          aria-label="Search Any Service"
          className="flex-1 bg-transparent outline-none text-[14px] sm:text-[15px] text-gray-800 placeholder:text-gray-400"
        />

        <button
          type="button"
          aria-label="More filters"
          className="shrink-0 mx-2 h-8 w-8 grid place-items-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <SlidersOutlined className="text-[16px]" />
        </button>
      </div> */}

      {/* Find expert button */}
      <div className="sm:ml-2 w-full sm:w-auto">
        <TealBtn
          onClick={submit}
          text="Find a Pro"
          className="w-full sm:w-auto h-11 sm:h-[50px] px-4 sm:px-6 text-sm sm:text-base"
         
        />
      </div>
    </form>
    </div>
  );
}
