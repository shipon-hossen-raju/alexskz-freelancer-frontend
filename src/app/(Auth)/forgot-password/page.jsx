'use client';

import { Form, Input, message } from 'antd';
import AuthShell from '@/components/shared/AuthShell';
import AuthButton from '@/components/ui/AuthButton';
import { MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Link from 'next/link';
import '@/styles/Auth.css'
import { useForgotPasswordMutation } from '@/redux/auth/authApi';
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'node_modules/next/navigation';

export default function ForgotPasswordPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const pathname = usePathname();
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();
  

  const onFinish = async (values) => {
    
    // console.log(values.email)
    const payload = {
      email: values.email
    }
    forgotPassword(payload)
      .unwrap()
        .then((res) =>{
          toast.success("Code is sent!")
          localStorage.setItem('email', payload.email)
          localStorage.setItem('previous-pathname', pathname)
          router.push("/verify-code");
        })
        .catch((error) => {
          console.log(error)
          toast.error(error?.data?.message);

        })
  };

  return (
    <AuthShell
      title="Forgot password"
      subtitle="Enter your email address and we’ll send you a code to reset your password."
      
      backHref="/sign-in"
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-4"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Enter a valid email' },
          ]}
        >
          <Input size="large" prefix={<MailOutlined />} placeholder="you@example.com" />
        </Form.Item>

        <div className='md:pt-10'>
         
          <AuthButton htmlType="submit"  text={`${isLoading? "Sending Code..." : "Send Code"}`}>
          
        </AuthButton>
         
        </div>
      </Form>
    </AuthShell>
  );
}
