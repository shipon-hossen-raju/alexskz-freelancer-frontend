"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload } from "antd";
import { EditOutlined, MailOutlined, CameraOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useGetUserProfileQuery } from "@/redux/auth/authApi";
import Avatar from "@mui/material/Avatar";
import { useUploadProfileImageMutation } from "@/redux/api/profileApi";
import toast from "react-hot-toast";

export default function ClientProfile() {
  const [avatar, setAvatar] = useState(""); // local preview / final url
  const { data: myData, error: myError, isLoading: amILoading, refetch } = useGetUserProfileQuery();
  const [uploadProfileImage, { isLoading }] = useUploadProfileImageMutation();

  const me = myData?.data;
  const firstName = me?.firstName || "";
  const lastName = me?.lastName || "";
  const name = `${firstName} ${lastName}`.trim();
  const email = me?.email || "";
  const jobTitle = me?.jobTitle || "";
  const role = me?.role;

  // initialize local avatar from server profileImage when available
  useEffect(() => {
    if (me?.profileImage) {
      setAvatar(me.profileImage);
    }
  }, [me?.profileImage]);

  // beforeUpload can be async. Return false to prevent antd auto-upload.
  const beforeUpload = async (file) => {
    const isImage = file.type && file.type.startsWith("image/");
    if (!isImage) {
      toast.error("You can only upload image files");
      return Upload.LIST_IGNORE;
    }

    // show immediate preview using object URL
    const localPreview = URL.createObjectURL(file);
    setAvatar(localPreview);

    // Build FormData — ensure "image" matches backend field name
    const fd = new FormData();
    fd.append("image", file);

    try {
      // call the RTK mutation and wait for the response
      
      const res = await uploadProfileImage(fd).unwrap();
      console.log("upload response:", res);

      // if server returns the final image URL, use it
      const returnedUrl = res?.data?.profileImage || res?.profileImage || null;
      if (returnedUrl) {
        // update local avatar to server URL (triggers re-render)
        setAvatar(returnedUrl);
      } else {
        // if not returned, optionally refetch the profile query
        await refetch();
        // after refetch, use me?.profileImage via effect
      }

      toast.success("Successfully uploaded!");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed. Try again.");
      // optionally revert preview
      if (me?.profileImage) setAvatar(me.profileImage);
      else setAvatar("");
    } finally {
     
    }

   
    return false;
  };

  // console.log("render avatar:", avatar, "server:", me?.profileImage);

  return (
    <div className="w-full max-w-xl p-4">
      <div className="bg-white rounded-[6px] border border-[#E6E6E6] shadow-[0_12px_34px_rgba(0,0,0,0.10)]">
        <div className="p-6">
          <div className="relative w-[84px] h-[84px]">
            <div className="relative w-full h-full rounded-full ring-2 ring-[#8BCF9A] overflow-hidden">
              {avatar ? (
                
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 grid place-items-center">
                  <Avatar sx={{ width: 84, height: 84 }} />
                </div>
              )}
            </div>

            <div className="absolute -bottom-1 -right-1">
              <Upload accept="image/*" showUploadList={false} beforeUpload={beforeUpload}>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-white border border-[#8BCF9A] grid place-items-center shadow-sm cursor-pointer"
                  aria-label="Upload new photo"
                >
                  <CameraOutlined style={{ color: "#8BCF9A" }} />
                </button>
              </Upload>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 font-open-sans">
            <div className="text-[20px] font-semibold" style={{ color: "#202020" }}>
              {name || "User"}
            </div>
            <Link href="/profile/edit" aria-label="Edit name" className="inline-flex items-center justify-center">
              <EditOutlined style={{ color: "#8BCF9A", fontSize: 16 }} />
            </Link>
          </div>

          <div>
            <span className="text-[14px] font-open-sans">{jobTitle}</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-transparent">
              <MailOutlined style={{ color: "#6F6F6F" }} />
            </span>
            <span className="text-[14px] font-open-sans" style={{ color: "#6F6F6F" }}>
              {email}
            </span>
          </div>

          {role === "USER" && (
            <Link
              href="/profile/change-password"
              className=" cursor-pointer mt-10 w-full flex items-center justify-between px-4 py-3 rounded-[10px] border border-[#D9D9D9] bg-[#E5E5E5] "
            >
              <span className="text-[14px] font-medium font-open-sans" style={{ color: "#6F6F6F" }}>
                Change Password
              </span>
              <span className="inline-grid place-items-center w-6 h-6 rounded-full border border-[#8BCF9A] bg-white/70">
                <RightOutlined style={{ color: "#8BCF9A", fontSize: 12 }} />
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
