'use client'
import CustomContainer from '@/components/ui/CustomContainer'
import Heading from '@/components/ui/Heading'
import React from 'react'
import { Form, Input } from 'antd';
import '@/styles/Auth.css'
import AuthButton from '@/components/ui/AuthButton';



export default function page() {
        const [form] = Form.useForm();
        const isLoading = false;
        const onFinish = async (values) => {

        }
    
  return (
    <div className='pb-10'>
      {/* <CustomContainer> */}
        <div className='text-center py-10'>
            <Heading text="Payment Verification In Progress..." />
        </div>

        <div className='max-w-lg mx-auto'>
            <Form
                            form={form}
                            layout="vertical"
                            requiredMark={false}
                            onFinish={onFinish}
            
                            className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-4"
                        >
            
                            <Form.Item
                                label="User ID"
                                name="userId"
                                rules={[
                                    { required: true, message: 'Please enter your user ID' },
            
                                ]}
                            >
            
            
                               <Input size="large" placeholder="Type here..." />
            
            
                            </Form.Item>
            
            
                            <Form.Item
                                label="Payment Transaction ID"
                                name="paymentId"
                                rules={[
                                    { required: true, message: 'Please enter payment ID' },
            
                                ]}
                            >
                                <Input size="large" placeholder="Type here..." />
                            </Form.Item>
            
            
            
                            <Form.Item
                                label="Session ID"
                                name="sessionId"
                                rules={[{ required: true, message: 'Please enter session ID' }]}
                            >
                                <Input size="large"  />
                            </Form.Item>
            
                            <div className='md:pt-6'>
            
                                <AuthButton htmlType="submit"  text={`${isLoading? "Verifying..." : "Verify Payment"}`}>
            
                                </AuthButton>
            
                            </div>
                        </Form>
        </div>
      {/* </CustomContainer> */}
    </div>
  )
}
