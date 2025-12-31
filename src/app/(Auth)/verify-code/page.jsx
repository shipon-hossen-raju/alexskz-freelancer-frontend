"use client";

import AuthShell from "@/components/shared/AuthShell";
import AuthButton from "@/components/ui/AuthButton";
import {
  useResendCodeMutation,
  useVerifyCodeMutation,
} from "@/redux/auth/authApi";
import { clearStepOne } from "@/redux/auth/userSlice";
import "@/styles/OtpInput.css";
import { Form, Input } from "antd";
import { useRouter } from "node_modules/next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function VerifyCodePage() {
  const [form] = Form.useForm();
  const [otp, setOtp] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [prevPath, setPrevPath] = useState("");
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  const [resendCode, { isLoading: isLoadingResendCode }] =
    useResendCodeMutation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const emailS = localStorage.getItem("email");
      if (!emailS) {
        // router.push("/sign-in");
        setEmail(emailS);
      }
      const roleS = localStorage.getItem("role");
      if (roleS === "FREELANCER") {
        // router.push("/sign-in");
        setRole(roleS);
      }
      const prevPathS = localStorage.getItem("previous-pathname");
      if (!prevPathS) {
        // router.push("/sign-in");
        setPrevPath(prevPathS);
      }
    }
  }, []);

  const onChange = (text) => {
    // console.log('onChange:', text);
    setOtp(text);
  };
  const onInput = (value) => {
    // console.log('onInput:', value);
  };

  const sharedProps = {
    onChange,
    onInput,
  };

  const onFinish = async () => {
    const num = parseInt(otp, 10);

    const payload = {
      email: email,
      verificationCode: num,
    };
    // console.log('otp', num)

    verifyCode(payload)
      .unwrap()
      .then((res) => {
        toast.success("Code verified successfully.");
        dispatch(clearStepOne());
        // console.log('from verify code', res)

        if (typeof window !== "undefined") {
          if (prevPath === "/forgot-password") {
            localStorage.removeItem("previous-pathname");
            router.push("/reset-password");
          } else {
            localStorage.removeItem("email");
            if (role === "FREELANCER") {
              router.push("/price");
            } else {
              router.push("/sign-in");
            }
          }
        }
      })
      .catch((error) => {
        // console.log(error)
        toast.error(error?.data?.message);
      });
  };

  const handleResendOTP = () => {
    const payload = {
      email: email,
    };

    resendCode(payload)
      .unwrap()
      .then(() => {
        toast.success("Code resent.");
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  };

  return (
    <AuthShell
      title="Verify Code"
      subtitle="Please check your email and enter the code."
      backHref={`${prevPath ? "/forgot-password" : "/sign-in"}`}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <div className="pt-6 otp-wrapper">
          <Form.Item
            name="code"
            // rules={[{ required: true, message: 'Please enter the OTP digit' }]}
            className=" text-center"
          >
            <Input.OTP length={5} {...sharedProps} />
          </Form.Item>
        </div>

        <div className="md:py-6">
          {/* <Link href="/reset-password"> */}
          <AuthButton
            isLoading={isLoading || isLoadingResendCode}
            htmlType="submit"
            text="Send Code"
          ></AuthButton>
          {/* </Link> */}
        </div>
      </Form>

      <p className="mt-4 text-[12px] text-[#9F9C96]">
        Didn’t receive it? Wait a few minutes or <br />
        <button
          onClick={handleResendOTP}
          className="cursor-pointer !text-[#595D62] text-sm !underline hover:!text-[#144A6C]"
        >
          resend the code.
        </button>
      </p>
    </AuthShell>
  );
}
