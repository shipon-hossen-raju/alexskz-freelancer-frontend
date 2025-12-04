
'use client';

import React from 'react';
import { Form, Input } from 'antd';

import AuthButton from '@/components/ui/AuthButton';
import '@/styles/Auth.css'
import CustomContainer from '@/components/ui/CustomContainer';
import Heading from '@/components/ui/Heading';
import CloseBtn from '@/components/ui/CloseBtn';
import Link from 'node_modules/next/link';


export default function PaymentForm({
  plan = {
    title: 'Basic Plan',
    price: '9.99',
    currency: '$',
    period: 'Monthly',
    billedText: 'Billed monthly',
    startDate: '08 | 16 | 2025',
    renewalDate: '09 | 16 | 2025',
    ctaText: 'Pay Now',
  },
}) {
  const [form] = Form.useForm();
const today = new Date().toISOString().split('T')[0];

  const onFinish = (values) => {
    // replace with real submit logic
    // console.log('Payment form submitted:', values);
  };

  return (
    <div className=' bg-gray-300 min-h-screen'>
        {/* close button */}
        <div>
            <CloseBtn path="/sign-up"/>
        </div>

      

        <div className='container mx-auto px-4  flex flex-col  justify-center min-h-[90vh] py-10'>
          {/* Heading */}
        <div className='pb-10 lg:pb-14'>
            <Heading text="Payment"/>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-[10%]">
        {/* Left: Payment Details */}
        <div className="bg-white rounded-xl p-6 shadow-2xl border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 font-nunito">Payment Details</h3>

          <Form 
          form={form} 
          layout="vertical" 
          onFinish={onFinish} 
          requiredMark={false}
          className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-4 !font-open-sans"
          >
            <Form.Item
              label="Card Holder Name"
              name="cardHolder"
             
              rules={[{ required: true, message: 'Please enter card holder name' }]}
            >
              <Input placeholder="Nur Mohammad Sujon" size="large" className="!bg-[#E8EDF0] !border-[#E8EDF0]"/>
            </Form.Item>

            <Form.Item  label="Card Number" name="cardNumber" rules={[{ required: true, message: 'Card number is required' }]}>
              <Input placeholder="XXXX XXXX XXXX XXXX" size="large" inputMode="numeric" className="!bg-[#E8EDF0] !border-[#E8EDF0]"/>
            </Form.Item>

            <div className="grid grid-cols-3 gap-3">
              <Form.Item
                label="Expiry Date"
                name="expiry"
                rules={[{ required: true }]}
                className="col-span-2"
              >
                <Input placeholder="MM/YY" size="large" className="!bg-[#E8EDF0] !border-[#E8EDF0]"/>
              </Form.Item>

              <Form.Item label="CVC" name="cvc" rules={[{ required: true }]} className="col-span-1">
                <Input placeholder="XXX" size="large" className="!bg-[#E8EDF0] !border-[#E8EDF0]"/>
              </Form.Item>
            </div>

            
          </Form>
        </div>

        {/* Right: Plan Info */}
        <div className="bg-white rounded-xl p-6 shadow-2xl border border-gray-100 flex flex-col justify-between">
          
          <div>
            <h3 className="text-sm font-medium mb-4 font-nunito">Plan Info</h3>

            <h2 className="text-xl font-semibold mb-2 font-nunito">{plan.title}</h2>

            <div className=" text-gray-600 space-y-4 ">
              <div className="flex justify-between font-nunito">
                <span className=''>Price :</span>
                <span className="text-[#6BAA7C] font-medium">
                  {plan.currency}
                  {plan.price}
                </span>
              </div>

              <div className="flex justify-between font-nunito">
                <span>Billing Frequency :</span>
                <span className="text-[#6BAA7C] font-medium">{plan.period}</span>
              </div>

              <div className="flex justify-between font-nunito">
                <span>Start date :</span>
                <span className="text-gray-500">{today}</span>
              </div>

              <div className="flex justify-between font-nunito">
                <span>Renewal date :</span>
                <span className="text-gray-500">{today}</span>
              </div>
            </div>

           
          </div>

           <div className="pt-8 px-[10%]">
             
              <Link href="/sign-in">
              <AuthButton text="Pay Now"/>
              </Link>
            </div>
        </div>
      </div>
        </div>
   
    </div>
  );
}
