'use client';

import { Form, Input, message } from 'antd';
import AuthShell from '@/components/shared/AuthShell';
import AuthButton from '@/components/ui/AuthButton';
import { useRef, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import '@/styles/OtpInput.css'
import { useResendCodeMutation, useVerifyCodeMutation } from '@/redux/auth/authApi';
import { useDispatch } from 'react-redux';
import { clearStepOne } from '@/redux/auth/userSlice';
import { usePathname, useRouter } from 'node_modules/next/navigation';


export default function VerifyCodePage() {
  const [form] = Form.useForm();
  const [otp, setOtp] = useState();
  const dispatch = useDispatch();
  const router = useRouter();



  const [verifyCode, {isLoading, error}] = useVerifyCodeMutation();
  const [resendCode, {isLoading: isLoadingResendCode, error: resendCodeError}] = useResendCodeMutation();


  const email = localStorage.getItem('email')

  const prevPath = localStorage.getItem('previous-pathname')

  
  const onChange = text => {
    console.log('onChange:', text);
    setOtp(text)
  };
  const onInput = value => {
    // console.log('onInput:', value);
  };

  const sharedProps = {
    onChange,
    onInput,
  };

  const onFinish = async () => {
    
    const payload = {
      email: email,
      verificationCode: otp,
    }

    verifyCode(payload)
      .unwrap()
        .then(() =>{
          toast.success('Code verified successfully.');
          dispatch(clearStepOne());
          
          if(prevPath === '/forgot-password') {
            localStorage.removeItem('previous-pathname')
            router.push('/reset-password');
          }
          else {
            localStorage.removeItem('email');
            router.push('/sign-in')
          }
        })
        .catch((error) => {
          console.log(error)
          toast.error(error?.data?.message);

        })
   
  };

  const handleResendOTP = ()=> {
     const payload = {
      email: email,
      
    }

    resendCode(payload)
      .unwrap()
        .then(() =>{
          toast.success('Code resent.');
          

          
        })
        .catch((error) => {
          
          toast.error(error?.data?.message);

        })
   
  }


  return (
    <AuthShell
      title="Verify Code"
      subtitle="Please check your email and enter the code."

      backHref={`${prevPath? "/forgot-password" : "/sign-in"}`}
    >
      <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
        <div className="pt-6 otp-wrapper">
      
          <Form.Item
            name="code"
            // rules={[{ required: true, message: 'Please enter the OTP digit' }]}
            className=" text-center"
          >
            <Input.OTP length={5} {...sharedProps} 
            
            />

          </Form.Item>

        </div>

        <div className='md:py-6'>
          {/* <Link href="/reset-password"> */}
          <AuthButton htmlType="submit" text="Send Code">

          </AuthButton>
          {/* </Link> */}
        </div>

        
      </Form>

      <p className="mt-4 text-[12px] text-[#9F9C96]">
          Didn’t receive it? Wait a few minutes or <br />
          <button onClick={handleResendOTP} className="cursor-pointer !text-[#595D62] text-sm !underline hover:!text-[#144A6C]">
            resend the code.
          </button>
        </p>
    </AuthShell>
  );
}
