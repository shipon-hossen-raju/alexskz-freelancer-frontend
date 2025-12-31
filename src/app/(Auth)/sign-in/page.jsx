"use client";

import AuthShell from "@/components/shared/AuthShell";
import AuthButton from "@/components/ui/AuthButton";
import "@/styles/Auth.css";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import Link from "next/link";
import { useDispatch } from "react-redux";
// import { loginUser } from '@/redux/auth/userSlice';
import { useSocket } from "@/hooks/useSocket";
import { useLoginUserMutation } from "@/redux/auth/authApi";
import { setUser } from "@/redux/auth/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const { authenticate } = useSocket();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const onFinish = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    await loginUser(payload)
      .unwrap()
      .then((res) => {
        // console.log('login res', res?.data?.token)
        const accessToken = res?.data?.token;
        const user = res?.data?.userData;
        if (accessToken) {
          if (typeof window !== "undefined") {
            localStorage.setItem("user-token", accessToken);
          }
          authenticate(accessToken); //for real time chatting
        }

        dispatch(
          setUser({
            user: user,
            token: accessToken,
          })
        );

        const userId = res?.data?.userData?.id;
        if (typeof window !== "undefined") {
          localStorage.setItem("user-id", userId);
        }
        toast.success("Login successful");
        router.push(redirect);
      })
      .catch((error) => {
        toast.error(error?.data?.message || "Login failed!");
      });
  };

  return (
    <AuthShell
      title="Sign in to your account"
      subtitle={
        <>
          Don’t have an account?{" "}
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
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined />}
            placeholder="you@example.com"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="********"
          />
        </Form.Item>

        <div className="mb-4 flex items-center justify-end">
          {/* <Checkbox>Remember me</Checkbox> */}
          <Link
            href="/forgot-password"
            className="!text-[#595D62] text-sm !underline hover:!text-[#144A6C]"
          >
            Forgot Password?
          </Link>
        </div>

        <AuthButton
          htmlType="submit"
          text={`${isLoading ? "Signing In..." : "Sign In"}`}
        ></AuthButton>
      </Form>

      <p className="mt-4 text-[12px] leading-relaxed text-[#9F9C96] ">
        By joining, you agree to the{" "}
        <Link
          className="!text-[#8BCF9A] hover:underline"
          href="/terms-conditions"
        >
          Terms of Service
        </Link>{" "}
         and to occasionally receive emails from us. Please read our{" "}
        <Link className="!text-[#8BCF9A] hover:underline" href="privacy-policy">
          Privacy Policy
        </Link>
        to learn how we use your personal data.
      </p>
    </AuthShell>
  );
}
