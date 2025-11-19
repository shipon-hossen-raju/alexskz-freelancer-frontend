'use client'
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { IoSend } from "react-icons/io5";
import '@/styles/UploadBtn.css'
import { useSocket } from '@/hooks/useSocket';

export default function MessageInput({ chatRoomId }) {
  const [fileList, setFileList] = useState([]);
  const [text, setText] = useState('');
  const { socket } = useSocket();
  const [form] = Form.useForm();

  // console.log('from msg input: ', chatRoomId);

  // clear input & files when switching conversation
  useEffect(() => {
    setText('');
    setFileList([]);
    form.resetFields();
  }, [chatRoomId, form]);

  const handleChange = info => {
    // keep only last 2 files (same behavior you had before)
    let newFileList = [...info.fileList].slice(-2);
    setFileList(newFileList);
  };

  const onFinish = values => {
    const message = values.text;

    if (socket) {
      socket.emit('sendMessage', {
        chatRoomId: chatRoomId,
        message: message,

      })

      setText('');
      setFileList([]);
      form.resetFields();
    }

    console.log('Send:', {
      text: values.text,
      images: fileList,
    });


  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const uploadProps = {
    multiple: true,
    beforeUpload: () => false, // prevent automatic upload
    onChange: handleChange,
    fileList,
  };

  const isSendButtonDisabled = !text && fileList.length === 0;

  return (
    <div className="border-t border-gray-200 px-6 py-4">
      <Form
        form={form}
        name="message-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className='flex  gap-4  items-start'>
          <div className='flex gap-4 items-start  flex-1'>
            <div className=' flex-1'>
              <Form.Item name="text" className="mb-0">
                <Input
                  size="large"
                  placeholder="Send message"
                  className=""
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Form.Item>
            </div>

            <Form.Item className="mb-0">
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} size="large" />
              </Upload>
            </Form.Item>
          </div>

          <div className=''>
            <Form.Item className="mb-0">
              {/* submit button */}
              <Button
                htmlType="submit"
                type="text"
                className=" !text-3xl !text-[#144A6C] !p-0"
                disabled={isSendButtonDisabled}
              >
                <IoSend />
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}
