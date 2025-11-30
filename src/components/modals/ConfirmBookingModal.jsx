'use client';

import { Modal, Form, Input, Select } from 'antd';
import Heading from '@/components/ui/Heading';
import TealBtn from '@/components/ui/TealBtn';
import { useState } from 'react';
import '@/styles/Auth.css'
import RoleToggleMUI from '../auth/RoleToggle';
import { useSelector } from 'react-redux';

const countryOpts = [
  { value: '+880', label: '🇧🇩  +880' },
  { value: '+1',   label: '🇺🇸  +1'   },
  { value: '+44',  label: '🇬🇧  +44'  },
  { value: '+971', label: '🇦🇪  +971' },
];

export default function ConfirmBookingModal({
  open,
  onClose,
  onConfirm, // (payload) => void
  slot,      // optional: { dayLabel, date, time }
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const savedRole = useSelector((state) => state.user.initialRole ?? null)

  const role1 ='For me'
  const role2 = 'For Others'

  console.log('from booking ...', slot)

  const submit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      onConfirm?.({ ...values, slot }); // send phone + dial + slot back up
    } finally {
      setLoading(false);
    }
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
          <Heading text="One Last Step" />
          <p className="mt-1 text-[13px] text-gray-500">
            Enter your contact info so your freelancer can reach you easily
          </p>

          {slot && (
            <p className="mt-2 text-[12px] text-gray-600 ">
              Selected: <span className="font-semibold">{slot.dayLabel}</span>, {slot.date} at{' '}
              <span className="font-semibold">{slot.time}</span>
            </p>
          )}
        </div>

       <div className='mt-10'>
         <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          className="mt-6"
          initialValues={{ dial: '+880', phone: '', role: role1}}
        >

           {/* Toggle button for buyer & seller */}
        <Form.Item name="role" valuePropName="value">
          <RoleToggleMUI role1={role1} role2={role2}/>
        </Form.Item>

        {
          savedRole === role2 && (
            <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input size="large" placeholder="e.g. John" />
          </Form.Item>
          )
        }

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
                  placeholder="+1 111 467 378 399"
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <div className="mt-6 flex justify-center">
            <TealBtn text={loading ? 'Submitting…' : 'Confirm Booking'} onClick={submit} />
          </div>
        </Form>
       </div>
      </div>
    </Modal>
  );
}
