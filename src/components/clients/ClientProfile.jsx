'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload } from 'antd';
import { EditOutlined, MailOutlined, CameraOutlined, RightOutlined } from '@ant-design/icons';

// demo image – replace with your user's photo or prop
import userImg from '@/assets/image/freelancer/user.jpg';
import Link from 'node_modules/next/link';

export default function ClientProfile() {
  const [avatar, setAvatar] = useState(userImg?.src || '');

  const beforeUpload = (file) => {
    // preview locally without uploading
    const reader = new FileReader();
    reader.onload = (e) => setAvatar(e.target.result);
    reader.readAsDataURL(file);
    return false; // prevent auto upload
  };

  console.log('avatar',avatar)

  return (
    <div className="w-full max-w-xl  p-4">
      <div className="bg-white rounded-[6px] border border-[#E6E6E6] shadow-[0_12px_34px_rgba(0,0,0,0.10)]">
        {/* content padding */}
        <div className="p-6">
          {/* Avatar + upload */}
          <div className="relative w-[84px] h-[84px]">
            <div className="relative w-full h-full rounded-full ring-2 ring-[#8BCF9A] overflow-hidden">
              {avatar ? (
                <Image src={avatar} alt="Profile" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>

            {/* camera upload button */}
            <div className="absolute -bottom-1 -right-1">
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={beforeUpload}
              >
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-white border border-[#8BCF9A] grid place-items-center shadow-sm"
                  aria-label="Upload new photo"
                >
                  <CameraOutlined style={{ color: '#8BCF9A' }} />
                </button>
              </Upload>
            </div>
          </div>

          {/* Name + edit */}
          <div className="mt-4 flex items-center gap-2 font-open-sans">
            <div className="text-[20px] font-semibold" style={{ color: '#202020' }}>
              Mr.jhon
            </div>
            <Link 
              href="/profile/edit"
              aria-label="Edit name"
              className="inline-flex items-center justify-center"
            >
              <EditOutlined style={{ color: '#8BCF9A', fontSize: 16 }} />
            </Link>
          </div>

          {/* Degicnation */}
          <div>
            <span className="text-[14px] font-open-sans">
              Chief Executive Officer (CEO)
            </span> 
          </div>

          {/* Email */}
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-transparent">
              <MailOutlined style={{ color: '#6F6F6F' }} />
            </span>
            <span className="text-[14px] font-open-sans" style={{ color: '#6F6F6F' }}>
              jhon@gmail.com
            </span>
          </div>

          {/* Change password pill (disabled look) */}
          <Link
            href="/profile/change-password"
           
            className=" cursor-pointer mt-10 w-full flex items-center justify-between px-4 py-3 rounded-[10px] border border-[#D9D9D9] bg-[#E5E5E5] "
          >
            <span className="text-[14px] font-medium font-open-sans" style={{ color: '#6F6F6F' }}>
              Change Password
            </span>

            <span className="inline-grid place-items-center w-6 h-6 rounded-full border border-[#8BCF9A] bg-white/70">
              <RightOutlined style={{ color: '#8BCF9A', fontSize: 12 }} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
