import Link from "node_modules/next/link";

export const MobileMenuItemsForLoginUser = [
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
      <Link href="/inbox">
        Messages
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link href="/bookings">
        Bookings
      </Link>
    ),
  },

  {
    key: '4',
    label: (
      <Link href="/explore">
        Explore
      </Link>
    ),
  },
  

  {
    key: '6',
    label: (
      <Link href="/profile">
        Profile
      </Link>
    ),
  },

  {
    key: '7',
    label: (
      <Link href="/notifications">
        Notification
      </Link>
    ),
  },
  // {
  //   key: 'logout',
  //   label: (
  //     <span className="cursor-pointer">Logout</span>
  //   ),
  // },

];

