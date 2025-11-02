// 'use client';

// import React, { useMemo, useState } from 'react';
// import { DownOutlined } from '@ant-design/icons';
// import { Dropdown } from 'antd';
// import Image from 'next/image';
// import icon from '@/assets/icons/navbarIcon.svg';

// export default function LanguageDropdown({ defaultKey = 'en', onChange }) {
//   const items = useMemo(
//     () => [
//       { key: 'en', label: 'EN' },
//       { key: 'es', label: 'ES' },
//     ],
//     []
//   );

//   // derive initial label from defaultKey prop (fallback to first item)
//   const initialLabel = (items.find(i => i.key === defaultKey) || items[0]).label;
//   const [selectedLabel, setSelectedLabel] = useState(initialLabel);

//   const handleMenuClick = ({ key }) => {
//     const label = (items.find(i => i.key === key) || items[0]).label;
//     setSelectedLabel(label);
//     if (typeof onChange === 'function') onChange(key);
//   };

//   return (
//     <div>
//       <Dropdown
//         trigger={['click']}
//         menu={{ items, onClick: handleMenuClick }}
//         placement="bottomRight"
//       >
//         <button
//           className="cursor-pointer inline-flex items-center gap-2 font-medium text-gray-800 hover:text-gray-900"
//           aria-label="Select language"
//           type="button"
//         >
//           {selectedLabel}
//           <DownOutlined className="text-xs font-medium" />
//         </button>
//       </Dropdown>
//     </div>
//   );
// }

// 'use client';

// import React, { useMemo, useState } from 'react';
// import { DownOutlined } from '@ant-design/icons';
// import { Dropdown } from 'antd';
// import Image from 'next/image';
// import icon from '@/assets/icons/navbarIcon.svg';

// const LANGS = [
//   { key: 'en', name: 'English', short: 'en' },
//   { key: 'fr', name: 'French',  short: 'fr' },
//   { key: 'de', name: 'German',  short: 'de' },
//   { key: 'it', name: 'Italian', short: 'it' },
//   { key: 'es', name: 'Spanish', short: 'es' },
// ];

// export default function LanguageDropdown({ defaultKey = 'en', onChange }) {
//   const [selectedKey, setSelectedKey] = useState(defaultKey);

//   // build antd items where label is a React node showing full name + small code
//   const items = useMemo(
//     () =>
//       LANGS.map(lang => ({
//         key: lang.key,
//         // label can be any React node
//         label: (
//           <div className="flex items-center justify-between w-44 px-3 py-2">
//             <span className="text-sm font-medium">{lang.name}</span>
//             <span className="text-xs text-gray-400">{lang.short}</span>
//           </div>
//         ),
//       })),
//     []
//   );

//   const handleMenuClick = ({ key }) => {
//     setSelectedKey(key);
//     if (typeof onChange === 'function') onChange(key);
//   };

//   // derive display text from selectedKey
//   const selectedLang = LANGS.find(l => l.key === selectedKey) || LANGS[0];

//   return (
//     <div>
//       <Dropdown
//         trigger={['click']}
//         menu={{ items, onClick: handleMenuClick }}
//         placement="bottomRight"
//         // CSS class applied to the dropdown panel so you can style it
//         overlayClassName="language-dropdown-panel"
//         overlayStyle={{ borderRadius: 12, padding: 4 }}
//       >
//         <button
//           className="cursor-pointer inline-flex items-center gap-2 font-medium text-gray-800 hover:text-gray-900"
//           aria-label="Select language"
//           type="button"
//         >
//           {/* optional icon - uncomment if you want icon visible */}
//           {/* <Image src={icon} alt="lang" width={20} height={20} /> */}
//           <span className="text-sm">{selectedLang.name}</span>
//           <DownOutlined className="text-xs font-medium" />
//         </button>
//       </Dropdown>

//       {/* small extra CSS to match the look in your screenshot (rounded card + subtle bg) */}
//       <style jsx>{`
//         /* adjust the dropdown inner card (Antd adds .ant-dropdown) */
//         :global(.language-dropdown-panel .ant-dropdown-menu) {
//           box-shadow: 0 8px 20px rgba(30, 30, 60, 0.12);
//           background: white;
//           border-radius: 12px;
//           padding: 6px 0;
//           min-width: 180px;
//         }
//         :global(.language-dropdown-panel .ant-dropdown-menu-item) {
//           padding: 0; /* we handle padding in the label node */
//         }
//         :global(.language-dropdown-panel .ant-dropdown-menu-item-active),
//         :global(.language-dropdown-panel .ant-dropdown-menu-item:hover) {
//           background: rgba(15, 23, 42, 0.04);
//         }
//       `}</style>
//     </div>
//   );
// }


'use client';

import React, { useMemo, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

const LANGS = [
  { key: 'en', name: 'English', short: 'EN' },
  { key: 'es', name: 'Spanish', short: 'ES' },
];

export default function LanguageDropdown({ defaultKey = 'en', onChange }) {
  const [selectedKey, setSelectedKey] = useState(defaultKey);

  const items = useMemo(
    () =>
      LANGS.map(lang => ({
        key: lang.key,
        label: (
          <div className="flex items-center justify-between w-44 px-3 py-2">
            <span className="text-sm font-medium">{lang.name}</span>
            <span className="text-xs text-gray-400">{lang.short}</span>
          </div>
        ),
      })),
    []
  );

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    if (typeof onChange === 'function') onChange(key);
  };

  const selected = LANGS.find(l => l.key === selectedKey) || LANGS[0];

  return (
    <div>
      <Dropdown
        trigger={['click']}
        menu={{ items, onClick: handleMenuClick }}
        placement="bottomRight"
        overlayClassName="language-dropdown-panel"
        // overlayStyle={{ borderRadius: 12, padding: 4 }}
      >
        <button
          type="button"
          className="cursor-pointer inline-flex items-center gap-1 font-medium text-gray-800 hover:text-gray-900 px-2 py-1"
          aria-label="Select language"
        >
          {/* show only the short code in the trigger */}
          <span className="text-sm md:text-[16px] xl:text-[22px] font-open-sans">{selected.short}</span>
          {/* <DownOutlined className="text-xs md:text-[16px]  font-medium" /> */}
        </button>
      </Dropdown>

      <style jsx>{`
        :global(.language-dropdown-panel .ant-dropdown-menu) {
          box-shadow: 0 8px 20px rgba(30, 30, 60, 0.12);
          background: white;
          border-radius: 12px;
          padding: 6px 0;
          min-width: 180px;
        }
        :global(.language-dropdown-panel .ant-dropdown-menu-item) {
          padding: 0;
        }
        :global(.language-dropdown-panel .ant-dropdown-menu-item-active),
        :global(.language-dropdown-panel .ant-dropdown-menu-item:hover) {
          background: rgba(15, 23, 42, 0.04);
        }
      `}</style>
    </div>
  );
}
