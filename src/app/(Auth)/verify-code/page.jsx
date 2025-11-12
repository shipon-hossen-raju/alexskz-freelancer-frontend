'use client';

import { Form, Input, message } from 'antd';
import AuthShell from '@/components/shared/AuthShell';
import AuthButton from '@/components/ui/AuthButton';
import { useRef, useState } from 'react';
import Link from 'next/link';

export default function VerifyCodePage() {
  const [form] = Form.useForm();
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);

  const handleKeyUp = (idx, e) => {
    const v = e.target.value;
    if (v.length === 1 && idx < 5) inputsRef.current[idx + 1]?.focus();
    if (e.key === 'Backspace' && v === '' && idx > 0) inputsRef.current[idx - 1]?.focus();
  };

  const onFinish = async () => {
    setLoading(true);
    try {
      // TODO: verify code
      message.success('Code verified successfully.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Verify Code"
      subtitle="Please check your email and enter the code."

      backHref="/sign-in"
    >
      <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
        <div className="mb-6 flex gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Input
              key={i}
              size="large"
              maxLength={1}
              bordered={false}
              className="h-11 w-11 text-center  !rounded-none !px-0 !border-b-1 !border-[#8BCF9A] 
              focus:!shadow-none focus:!outline-none
              focus:border-b-2 focus:border-[#8BCF9A] 
            hover:!border-[#8BCF9A]"
              onKeyUp={(e) => handleKeyUp(i, e)}
              ref={(el) => (inputsRef.current[i] = el)}
            />
          ))}
        </div>

       <div className='md:py-6'>
         <Link href="/reset-password">
         <AuthButton htmlType="submit" loading={loading} text="Send Code">

        </AuthButton>
         </Link>
       </div>

        <p className="mt-4 text-[12px] text-[#9F9C96]">
          Didn’t receive it? Wait a few minutes or <br />
          <button className="cursor-pointer !text-[#595D62] text-sm !underline hover:!text-[#144A6C]">
            resend the code.
          </button>
        </p>
      </Form>
    </AuthShell>
  );
}
