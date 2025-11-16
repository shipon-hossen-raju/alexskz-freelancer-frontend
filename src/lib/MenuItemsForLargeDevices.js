import Link from "node_modules/next/link";

export const  MenuItemsForLargeDevices  = [
  {
    key: '1',
    label: (
      <Link href="/">
        Home
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link href="/explore">
        Explore
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link href="/start-selling">
        Join as a Pro
      </Link>
    ),
  },

  {
    key: '4',
    label: (
      <Link href="/services">
        Certified Services
      </Link>
    ),
  },
  {
    key: '5',
    label: (
      <Link href="/about-us">
        About us
      </Link>
    ),
  },
  
  

];

