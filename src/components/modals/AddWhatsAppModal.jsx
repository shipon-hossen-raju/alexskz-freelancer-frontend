'use client';

import { Modal, Form, Input, Select } from 'antd';
import Heading from '@/components/ui/Heading';
import TealBtn from '@/components/ui/TealBtn';
import { useState } from 'react';
import '@/styles/Auth.css'
import { useUpdateWhatsAppNumberMutation } from '@/redux/api/profileApi';
import toast from 'react-hot-toast';


const countryOpts = [
    { value: '+1', label: '🇺🇸  +1' },
    { value: '+880', label: '🇧🇩  +880' },
    { value: '+44', label: '🇬🇧  +44' },
    { value: '+971', label: '🇦🇪  +971' },
];

export default function AddWhatsAppModal({ open, onClose }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [updateWhatsAppNumber, {isLoading}] = useUpdateWhatsAppNumberMutation();

    const onFinish = async (values) => {
        const phn = (values.phone).trim()
        const dial = (values.dial).trim()
        const phoneNum = `${dial}${phn}`.trim();
        console.log('whats app', phoneNum)

        const payload = {
            whatsappNumber: phoneNum
        };

        updateWhatsAppNumber(payload)
            .unwrap()
                .then(() => {
                    toast.success("What's App number added successfully!")
                    form.resetFields();
                    onClose?.();
                })
                .catch((err) => {
                    toast.error(err?.data?.message || err?.message || "Something went wrong!")
                })

    };


    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            width={520}
            destroyOnClose
            title={null}
            className="!font-open-sans"
            styles={{ content: { borderRadius: 12, padding: 0 } }}
        >
            <div className="p-5 sm:p-6">
                <div className="text-center">
                    <Heading text="Add Your Whats App" />
                    <p className="mt-1 text-[13px] text-gray-500">
                        Enter your contact info so your Buyer can reach you easily
                    </p>


                </div>

                <div className='mt-10'>
                    <Form
                        form={form}
                        layout="vertical"
                        requiredMark={false}
                        onFinish={onFinish}
                        className="mt-6"
                        initialValues={{ dial: '+1', phone: '' }}
                    >





                        <Form.Item
                            label={<span className="text-[14px] text-gray-800">Whats App</span>}
                            required
                        >
                            <Input.Group compact>
                                <Form.Item
                                    name="dial"
                                    noStyle
                                    rules={[{ required: true, message: 'Select code' }]}
                                >
                                    <Select
                                        className="wa-select"
                                        style={{ width: 120 }}
                                        options={countryOpts}
                                        dropdownStyle={{ fontFamily: 'var(--font-open-sans-src)' }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    noStyle
                                    rules={[
                                        { required: true, message: 'Enter your WhatsApp number' },
                                        { pattern: /^[0-9\s\-()+]{6,20}$/, message: 'Enter a valid phone number' },
                                    ]}
                                >
                                    <Input
                                        style={{ width: 'calc(100% - 120px)' }}
                                        placeholder="111 467 378 399"
                                    />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>

                        <Form.Item>
                            <div className="mt-6 flex justify-center">
                                <TealBtn text={isLoading ? 'Saving…' : 'Save'}  />
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}
