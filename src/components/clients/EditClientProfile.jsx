'use client';

import React from 'react';
import { Form, Input } from 'antd';
import TealBtn from '@/components/ui/TealBtn';
import '@/styles/Auth.css'
import { useGetUserProfileQuery } from '@/redux/auth/authApi';
import Loading from '../shared/Loading';
import { useEditProfileMutation } from '@/redux/api/profileApi';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function EditClientProfile() {
  const [form] = Form.useForm();
  const {data: userData, error:userError, isLoading: isUserLoading} = useGetUserProfileQuery();
  const [editProfile, {isLoading}] = useEditProfileMutation();
  const router = useRouter();

  if(isUserLoading) {
    return <Loading />
  }

  // console.log(userData)

  const onFinish = (values) => {
    // console.log('Save Changes:', values);
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      jobTitle: values.job
    }

    editProfile(payload)
      .unwrap()
        .then(()=>{
          toast.success("Profile updated successfully!")
          router.push('/profile')
          
        })
        .catch((error) =>{
          toast.error(error?.data?.message);
        })

  };

  return (
    <div className="w-full max-w-xl mx-auto  font-open-sans">
      <div className="bg-white rounded-[6px] border border-[#E6E6E6] shadow-[0_12px_34px_rgba(0,0,0,0.10)] py-10">
        {/* Heading */}
        <div className="pt-6 px-6 text-center">
          <h2 className="text-[20px] font-semibold text-[#202020] mb-8 !font-open-sans">Edit Profile</h2>
        </div>

        {/* Form */}
        <div className="px-6 pb-8 pt-4">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            initialValues={{
              firstName: userData?.data?.firstName || "",
              lastName: userData?.data?.lastName || "",
              email: userData?.data?.email || "",
            }}
            className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-4"
          >
            {/* Name row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="First name" name="firstName">
                <Input
                  size="large"
                  placeholder=""
                  className="placeholder-poppins"
                />
              </Form.Item>

              <Form.Item label="Last name" name="lastName">
                <Input
                  size="large"
                  placeholder=""
                  className="placeholder-poppins"
                />
              </Form.Item>
            </div>

            {/* job */}
            <Form.Item label="Job" name="job">
                <Input
                  size="large"
                  placeholder="Enter your job title"
                  className="placeholder-poppins"
                />
              </Form.Item>

            {/* Email */}
            <Form.Item label="Email" name="email">
              <Input
                size="large"
                type="email"
                placeholder="example@gmail.com"
                disabled
                className="placeholder-poppins"
              />
            </Form.Item>

            {/* Button */}
            <div className="pt-2 flex justify-center">
              {/* If your TealBtn expects children instead of a prop, use: <TealBtn>Save Changes</TealBtn> */}
              <TealBtn htmlType="submit" text={isLoading? "Saving..." : "Save Changes"}  />
            </div>
          </Form>
        </div>
      </div>

      {/* make placeholders use Poppins only */}
      <style jsx global>{`
        .placeholder-poppins::placeholder {
          font-family: var(--font-poppins), ui-sans-serif, system-ui !important;
        }
      `}</style>
    </div>
  );
}
