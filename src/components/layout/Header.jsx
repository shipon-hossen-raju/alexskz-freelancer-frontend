"use client";

import logo from "@/assets/logo2.svg";
import { useGetTotalNotificationUnreadQuery } from "@/redux/api/notificationApi";
import Avatar from "@mui/material/Avatar";
import { Badge, Dropdown } from "antd";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { useSelector } from "react-redux";
import CustomSearch from "../ui/CustomSearch";
import LanguageDropdown from "../ui/LanguageDropdown";
import ProfileDropdown from "../ui/ProfileDropdown";

export default function Header() {
  // 1) All hooks at the very top, no conditions around them
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [isNotMobile, setIsNotMobile] = useState(false);
  const pathname = usePathname();
  const user = useSelector((state) => state.user?.user || null);
  const role = user?.role;
  const { data: unreadNotifications } =
    useGetTotalNotificationUnreadQuery(undefined);
  const notificationCount = unreadNotifications?.data ?? 0;

  // detect width < 768
  useEffect(() => {
    const handleResize = () => {
      setIsNotMobile(window.innerWidth > 767); // md breakpoint
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Side effects
  useEffect(() => {
    const onDrawerOpen = () => setDropDownOpen(false);
    window.addEventListener("drawer:open", onDrawerOpen);
    return () => window.removeEventListener("drawer:open", onDrawerOpen);
  }, []);

  const menuItems = [
    {
      key: "home",
      route: "/",
      isActive: pathname === "/",
      text: "Home",
      visible: true,
    },
    {
      key: "explore",
      route: "/explore",
      isActive: pathname === "/explore",
      text: "Explore",
      visible: !user,
    },
    {
      key: "start-selling",
      route: "/start-selling",
      isActive: pathname === "/start-selling",
      text: "Join as a pro",
      visible: !user,
    },
    {
      key: "inbox",
      route: "/inbox",
      isActive: pathname === "/inbox",
      text: "Messages",
      visible: !!user,
    },
    {
      key: "profile",
      route: "/profile",
      isActive: pathname === "/profile",
      text: "Profile",
      visible: !!user,
    },
    {
      key: "bookings",
      route: "/bookings",
      isActive: pathname === "/bookings",
      text: "Bookings",
      visible: !!user,
    },
    {
      key: "services",
      route: "/services",
      isActive: pathname === "/services",
      text: "Certified services",
      visible: "all",
    },
    {
      key: "about-us",
      route: "/about-us",
      isActive: pathname === "/about-us",
      text: "About us",
      visible: !user,
    },
  ];

  // Filter visible items based on user state
  const filteredItems = menuItems.filter(
    (item) => item.visible === true || item.visible === "all"
  );

  // Create the dropdown menu items dynamically
  const dropdownMenuItems = filteredItems.map((item) => ({
    key: item.key,
    label: <Link href={item.route}>{item.text}</Link>,
  }));

  return (
    <div className="px-2 md:px-4  w-full">
      <nav className="w-full relative z-20 container mx-auto px-2 md:px-4 xl:px-8 py-3 lg:py-4 bg-[#E1E1E1]/50 mt-4 rounded-[20px] border border-[#E1E1E1]">
        <div className="flex justify-between items-center">
          {/* logo */}
          <div>
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>

          {/* search field for Client */}
          {user && role === "USER" && (
            <div className="hidden md:block">
              <CustomSearch />
            </div>
          )}

          {/* desktop nav links */}
          <div className="hidden xl:block">
            <ul className="font-open-sans lg:text-[16px] xl:text-[22px] flex items-center gap-8">
              {filteredItems.map((item) => (
                <MenuItem
                  key={item.key}
                  route={item.route}
                  isActive={item.isActive}
                  text={item.text}
                />
              ))}
            </ul>
          </div>

          {/* right section */}
          <div className="flex items-center">
            {/* Language */}
            <div>
              <LanguageDropdown />
            </div>

            {/* Auth / Profile area */}
            {user ? (
              <div className="flex items-center gap-2">
                {/* <Link href="/profile"> */}
                  {/* Profile image */}
                  {/* <Avatar
                    size={{
                      xs: 48,
                      sm: 48,
                      md: 50,
                      lg: 64,
                      xl: 70,
                      xxl: 74,
                    }}
                    src={user?.profileImage}
                  /> */}
                {/* </Link> */}
                <div>
                  <ProfileDropdown />
                </div>

                {/* Notifications */}
                <div className="hidden md:block">
                  <Badge
                    count={notificationCount}
                    color="#8BCF9A"
                    className="
                      [&_.ant-badge-count]:!shadow-none
                      [&_.ant-badge-count]:!border-0
                      [&_.ant-badge-dot]:!shadow-none
                      [&_.ant-badge-dot]:!border-0
                    "
                  >
                    <button className="cursor-pointer text-gray-300 hover:text-white rounded-lg transition-all duration-200 hover:scale-110">
                      <Link href="/notifications">
                        <Bell className="w-6 h-6 !text-[#8BCF9A]" />
                      </Link>
                    </button>
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 lg:gap-4 items-center">
                <Link
                  href="/sign-in"
                  className="hidden md:block border border-[#144A6C] text-[#144A6C] font-open-sans font-semibold px-3 py-1 md:px-8 md:py-2 rounded-[8px]"
                >
                  Sign in
                </Link>

                <Link
                  href="/sign-up"
                  className="hidden md:block bg-[#144A6C] text-white font-open-sans font-semibold px-3 py-1 md:px-8 md:py-2 rounded-[8px]"
                >
                  Join
                </Link>
              </div>
            )}

            {/* mobile menu */}
            <div className="flex items-center">
              <div className="xl:hidden pl-2">
                <Dropdown
                  menu={{ items: dropdownMenuItems }}
                  trigger={["click"]}
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                  open={dropdownOpen}
                  onOpenChange={(open) => {
                    setDropDownOpen(open);
                    if (open) {
                      window.dispatchEvent(new CustomEvent("dropdown:open"));
                    }
                  }}
                  overlayStyle={{ zIndex: 1300 }}
                  getPopupContainer={() => document.body}
                >
                  <button
                    type="button"
                    aria-label="Open menu"
                    className="rounded flex items-center cursor-pointer"
                  >
                    <TfiAlignJustify style={{ fontSize: 20 }} />
                  </button>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

function MenuItem({ route, isActive = false, text }) {
  const activeBtn = "bg-[#144A6C] text-white rounded-[8px] px-4 py-1 ";

  return (
    <Link href={route}>
      <li
        className={` cursor-pointer ${
          isActive ? activeBtn : "font-semibold hover:text-[#144A6C]"
        }`}
      >
        {text}
      </li>
    </Link>
  );
}
