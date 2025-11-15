'use client';

import { Form, Input, message, Avatar, Space } from 'antd';
import AuthShell from '@/components/shared/AuthShell';
import AuthButton from '@/components/ui/AuthButton';
import { LockOutlined, UserOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Link from 'next/link';
import '@/styles/Auth.css'
import RoleToggleMUI from '@/components/auth/RoleToggle';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'node_modules/next/navigation';
import { createUser, createUserStepOne } from '@/redux/auth/userSlice';
import { Password } from 'node_modules/@mui/icons-material/index';
import { useSignupForClientMutation } from '@/redux/auth/authApi';
import toast from 'react-hot-toast';
import RegisterPageStep2 from './step-2/page';

export default function RegisterPage() {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const router = useRouter();

  const savedRole = useSelector((state) => state.user.initialRole ?? null)

  const role1 = 'Client';
  const role2 = 'Become a Pro'

  const [signupForClient, { isLoading }] = useSignupForClientMutation();

  const onFinish = async (values) => {

    const role = savedRole || values.role

    // console.log("saved role: ", role)
    console.log('sign up', values)



    if (role === "Client") {

      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        email: values.email,
        role: "USER",

      }
      console.log(payload)

      signupForClient(payload)
        .unwrap()
        .then(() => {
          toast.success('Account created successfully');
          localStorage.setItem('email', payload.email)
          router.push('/verify-code');
        })
        .catch((error) => {
          console.log(error)
          toast.error(error?.data?.message);

        })
    }

    else if (savedRole === "Become a Pro") {
      // console.log(values)


      dispatch(createUserStepOne(values))
      router.push('/sign-up/step-2')
    }
  };




  return (
    <AuthShell
      title="Create a new account"
      subtitle={
        <>
          Already have an account?{' '}
          <Link href="/sign-in" className="text-[#1F4E78] hover:underline">
            Sign in
          </Link>
        </>
      }

      backHref="/sign-in"
      register={true}

    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        initialValues={{ role: role1 }}
        className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-4"
      >
        {/* Toggle button for buyer & seller */}
        <Form.Item name="role" valuePropName="value">
          <RoleToggleMUI role1={role1} role2={role2} />
        </Form.Item>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Form.Item
            label="First name"
            name="firstName"
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input size="large" prefix={<UserOutlined />} placeholder="e.g. John" />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input size="large" prefix={<UserOutlined />} placeholder="e.g. Doe" />
          </Form.Item>
        </div>

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

        {savedRole === role2 && (
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: 'Please enter your address' },
              // { type: 'text', message: 'Enter a valid email' },
            ]}
          >
            <Input size="large" prefix={<EnvironmentOutlined />} placeholder="Dhaka ,Bangladesh" />
          </Form.Item>

        )}

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please create a password' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Create password" />
        </Form.Item>

        <div className='md:pt-6'>

          <Form.Item>
            <AuthButton htmlType="submit" text={savedRole === role2 ? "Next" : ((savedRole !== role2 && isLoading) ? "Creating Account..." : "Create Account")}>

            </AuthButton>

          </Form.Item>
        </div>
      </Form>
    </AuthShell>
  );
}
