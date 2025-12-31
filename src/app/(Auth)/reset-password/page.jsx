"use client";

import AuthShell from "@/components/shared/AuthShell";
import AuthButton from "@/components/ui/AuthButton";
import { useResetPasswordMutation } from "@/redux/auth/authApi";
import "@/styles/Auth.css";
import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useRouter } from "node_modules/next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const emailS = localStorage.getItem("email");
      if (emailS) {
        setEmail(emailS);
      }
    }
  }, []);

  const onFinish = async ({ password, confirm }) => {
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    const payload = {
      email: email,
      password: password,
    };

    resetPassword(payload)
      .unwrap()
      .then((res) => {
        toast.success("Password reset successfully!");
        if (typeof window !== "undefined") {
          localStorage.removeItem("email");
        }
        router.push("/sign-in");
      })
      .catch((error) => {
        // console.log(error)
        toast.error(error?.data?.message || "Something went wrong!");
      });
  };

  return (
    <AuthShell
      title="Reset Password"
      subtitle="Your password must 8-10 character long & 1 uppercase & lowercase ."
      backHref="/verify-code"
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-4"
      >
        <Form.Item
          label="New Password"
          name="password"
          rules={[{ required: true, message: "Please enter a new password" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="New password"
          />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirm"
          dependencies={["password"]}
          rules={[{ required: true, message: "Please confirm your password" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Confirm password"
          />
        </Form.Item>

        <div className="md:pt-6">
          <AuthButton
            htmlType="submit"
            text={`${isLoading ? "Saving..." : "Save Changes"}`}
          ></AuthButton>
        </div>
      </Form>
    </AuthShell>
  );
}
