"use client";

import { useSocket } from "@/hooks/useSocket";
import { baseApi } from "@/redux/api/baseApi";
import { useLogoutUserMutation } from "@/redux/auth/authApi";
import { clearUser } from "@/redux/auth/userSlice";
import { Avatar, Dropdown, Space } from "antd";
import { useRouter } from "next/navigation";
import toast from "node_modules/react-hot-toast/dist/index";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileDropdown() {
  const user = useSelector((state) => state.user?.user || null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { socket } = useSocket();
  const [logoutUser] = useLogoutUserMutation();

  const items = useMemo(
    () => [
      // { key: "profile", label: "Profile" },

      { key: "logout", label: "Logout" },
    ],
    []
  );

  const onMenuClick = ({ key }) => {
    if (key === "profile") {
      router.push("/profile");
      return;
    }
    if (key === "logout") {
      logoutUser()
        .unwrap()
        .then(() => {
          if (socket) {
            socket.disconnect();
          }
          dispatch(clearUser());
          dispatch(baseApi.util.resetApiState()); // <-- clear all RTK Query cache
        })
        .catch((error) => {
          toast.error(error?.data?.message);
        });
    }
  };

  return (
    <Dropdown menu={{ items, onClick: onMenuClick }} trigger={["click"]} placement="bottomRight" className="mb-10" >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {/* <DownOutlined className="!text-[#8BCF9A] !cursor-pointer" /> */}
          <Avatar
            size={{
              xs: 48,
              sm: 48,
              md: 50,
              lg: 65,
              xl: 40,
              // xxl: 74,
            }}
            className="cursor-pointer"
            src={user?.profileImage}
          />
        </Space>
      </a>
    </Dropdown>
  );
}
