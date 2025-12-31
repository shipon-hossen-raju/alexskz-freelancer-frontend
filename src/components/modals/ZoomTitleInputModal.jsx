"use client";

import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";

import { useSocket } from "@/hooks/useSocket";
import TealBtn from "../ui/TealBtn";
import TealOutLineBtn from "../ui/TealOutLineBtn";

export const ZoomTitleInputModal = ({ isOpen, onClose, chatRoomId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { socket } = useSocket();

  useEffect(() => {
    form.resetFields();
  }, [chatRoomId, form]);

  const handleCancel = () => {
    form.resetFields();
    if (typeof onClose === "function") onClose();
  };

  const handleFinish = async (values) => {
    // console.log('topic: ', )

    if (socket) {
      socket.emit("zoomCall", {
        roomId: chatRoomId,
        topic: values.topic,
      });
      form.resetFields();
      onClose();
    }
  };

  return (
    <Modal
      title=""
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      className="rounded-lg"
      style={{ padding: "24px" }} // use `style` not `styles`
      destroyOnClose
    >
      <Form
        form={form}
        name="meetingForm"
        layout="vertical"
        onFinish={handleFinish}
        requiredMark={false}
      >
        <div className="space-y-6">
          {/* Input Field */}
          <div className="space-y-2">
            <Form.Item
              label={
                <span className="block text-sm font-medium text-foreground">
                  Enter Topic
                </span>
              }
              name="topic"
              rules={[
                  { required: true, message: "Please enter a topic/title" },
                  { min: 3, message: "Topic must be at least 3 characters long" },
                  { max: 50, message: "Topic must be at most 50 characters long" },
              ]}
            >
              <Input
                id="topic"
                placeholder="Meeting Topic here..."
                size="large"
                className="w-full px-4 py-2 border-2 border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-[#144A6C] focus:ring-1 focus:ring-[#144A6C] transition-colors"
              />
            </Form.Item>
          </div>

          {/* Buttons */}
          <Form.Item>
            <div className="flex gap-3 justify-end">
              <TealOutLineBtn onClick={handleCancel} text="Cancel" />

              {/* Make the TealBtn trigger the form submit */}
              <TealBtn
                onClick={() => form.submit()}
                text={loading ? "Calling..." : "Call"}
                disabled={loading}
              />
            </div>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ZoomTitleInputModal;
