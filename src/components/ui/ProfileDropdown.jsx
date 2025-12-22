"use client";

import { useSocket } from "@/hooks/useSocket";
import { baseApi } from "@/redux/api/baseApi";
import { useLogoutUserMutation } from "@/redux/auth/authApi";
import { clearUser } from "@/redux/auth/userSlice";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useRouter } from "next/navigation";
import toast from "node_modules/react-hot-toast/dist/index";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

export default function ProfileDropdown() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { socket } = useSocket();
  const [logoutUser] = useLogoutUserMutation();

  const items = useMemo(
    () => [
      { key: "profile", label: "Profile" },

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
    <Dropdown menu={{ items, onClick: onMenuClick }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <DownOutlined className="!text-[#8BCF9A] !cursor-pointer" />
        </Space>
      </a>
    </Dropdown>
  );
}
