'use client';

import { Form, Input, Checkbox, message } from 'antd';
import Link from 'next/link';
import AuthShell from '@/components/shared/AuthShell';
import AuthButton from '@/components/ui/AuthButton';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import '@/styles/Auth.css'
import { useDispatch } from 'react-redux';
// import { loginUser } from '@/redux/auth/userSlice';
import { useRouter } from 'next/navigation';
import { useLoginUserMutation } from '@/redux/auth/authApi';
import { Password } from 'node_modules/@mui/icons-material/index';
import toast from 'react-hot-toast';
import { setUser } from '@/redux/auth/userSlice';
import { useSocket } from '@/hooks/useSocket';

export default function LoginPage() {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const router = useRouter();
  const { authenticate } = useSocket();

  const [loginUser, {isloading}] = useLoginUserMutation();

  const onFinish = async (values) => {

    // console.log(values)

    const payload = {
      email: values.email,
      password: values.password

    }

    loginUser(payload)
      .unwrap()
        .then((res) =>{
          // console.log('login res', res?.data?.token)
          const accessToken = res?.data?.token
          if(accessToken) {
            localStorage.setItem("user-token", accessToken)
            authenticate(accessToken);    //for real time chatting
          }

          dispatch(setUser({
            user: payload,
            token: accessToken
          }));
          
          const userId = res?.data?.userData?.id
          localStorage.setItem('user-id', userId);

          toast.success('Login successful');
          router.push('/');
        })
        .catch((error) =>{
          toast.error(error?.data?.message);
        })
    
    

   
  };

  return (
    <AuthShell
      title="Sign in to your account"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href="/sign-up" className="text-[#1F4E78] hover:underline">
            Join here
          </Link>
        </>
      }
      
      backHref="/"
      backText="Back"
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

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="********" />
        </Form.Item>

        <div className="mb-4 flex items-center justify-end">
          {/* <Checkbox>Remember me</Checkbox> */}
          <Link href="/forgot-password" className="!text-[#595D62] text-sm !underline hover:!text-[#144A6C]">
            Forgot Password?
          </Link>
        </div>

        <AuthButton htmlType="submit"  text={`${isloading? "Signing In..." : "Sign In"}`}>
          
        </AuthButton>

        
      </Form>

      <p className="mt-4 text-[12px] leading-relaxed text-[#9F9C96] ">
          By joining, you agree to the{' '}
          <Link className="!text-[#8BCF9A] hover:underline" href="/terms-conditions">
            Terms of Service
          </Link>{' '}
           and to occasionally receive emails from us. Please read our{' '}
          <Link className="!text-[#8BCF9A] hover:underline" href="privacy-policy">
            Privacy Policy
          </Link>
          to learn how we use your personal data.
        </p>
    </AuthShell>
  );
}
