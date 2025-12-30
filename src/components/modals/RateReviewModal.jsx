import { useCreateReviewMutation } from "@/redux/api/bookingApi";
import "@/styles/Auth.css";
import { Col, Form, Input, Modal, Rate, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TealBtn from "../ui/TealBtn";
import TealOutLineBtn from "../ui/TealOutLineBtn";
import { setReviewBookingData } from "@/redux/slices/bookingSlice";

const { TextArea } = Input;

const likeOptions = [
  "Dedication throughout the work",
  "Efficiency",
  "Punctuality",
];

const improveOptions = [
  "communication gaps",
  "insufficient expertise",
  "the meeting was too short",
  "the deliverable didn't convince me",
];

// export default function RateReviewModal({ visible, onCancel, bookingId }) {
export default function RateReviewModal() {
  const reviewBookingData = useSelector(
    (state) => state?.booking?.reviewBookingData || null
  );
  const dispatch = useDispatch();
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [form] = Form.useForm();
  const [whatLiked, setWhatLiked] = React.useState("");
  const [whatImprove, setWhatImprove] = React.useState("");
  const visible = reviewBookingData?.model;
  const bookingId = reviewBookingData?.bookingId;

  const onCancel = () => {
    dispatch(setReviewBookingData({ model: false, bookingId: null }));
  };

  // Small helper to render chip-like buttons
  const Chip = ({ children, selected, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`chip ${selected ? "chip--selected" : ""}`}
    >
      {children}
    </button>
  );

  const handleOk = async () => {
    try {
      const payload = {
        bookingId: bookingId,
        rating: form.getFieldValue("rating"),
        mostLike: form.getFieldValue("whatLiked") || whatLiked,
        improve: form.getFieldValue("whatImprove") || whatImprove,
        experience: form.getFieldValue("feedback"),
      };

      // onSubmit?.(payload);
      await createReview(payload);
      onCancel();
      form.resetFields();
      setWhatLiked("");
      setWhatImprove("");
    } catch (err) {
      // validation failed — do nothing (antd will show errors)
      console.error(err);
      // toast.success(err.message || "Something went wrong!");
    }
  };

  return (
    <>
      <Modal
        open={visible}
        onCancel={onCancel}
        footer={null}
        centered
        width={520}
        bodyStyle={{ padding: 24, borderRadius: 12 }}
        style={{ borderRadius: 12 }}
        maskStyle={{ background: "rgba(0,0,0,0.45)" }}
        className="rate-review-modal !font-open-sans"
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: 6,
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          Rate &amp; Review Service
        </h3>
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#6b7280",
            marginBottom: 18,
          }}
        >
          Share your experience to help others make informed choices
        </p>

        <Form layout="vertical" form={form} requiredMark={false}>
          {/* What did you like the most? */}
          <Form.Item
            label="What did you like the most?"
            name="whatLiked"
            rules={[
              { required: true, message: "Please select at least one option" },
            ]}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {likeOptions.map((opt) => (
                  <Chip
                    key={opt}
                    selected={whatLiked === opt}
                    onClick={() => {
                      setWhatLiked(opt);
                      form.setFieldsValue({ whatLiked: opt });
                    }}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>

              <Input
                size="large"
                placeholder="Other"
                name="whatLiked"
                value={form.getFieldValue("whatLiked") || whatLiked}
                onChange={(e) => setWhatLiked(e.target.value)}
              />
            </div>
          </Form.Item>

          {/* Is there anything we could improve? */}
          <Form.Item
            label="Is there anything we could improve?"
            name="whatImprove"
            rules={[
              { required: true, message: "Please select at least one option" },
            ]}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {improveOptions.map((opt) => (
                  <Chip
                    key={opt}
                    selected={whatImprove === opt}
                    onClick={() => {
                      setWhatImprove(opt);
                      form.setFieldsValue({ whatImprove: opt });
                    }}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>

              <Input
                size="large"
                placeholder="Other"
                name="whatImprove"
                value={form.getFieldValue("whatImprove") || whatImprove}
                onChange={(e) => {
                  setWhatImprove(e.target.value);
                }}
              />
            </div>
          </Form.Item>

          {/* Overall rating */}
          <Form.Item
            label={
              <div style={{ textAlign: "center", fontWeight: 600 }}>
                Overall, how would you rate the experience?
              </div>
            }
            name="rating"
            style={{ marginBottom: 12 }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Rate
                name="rating"
                value={form.getFieldValue("rating")}
                onChange={(value) => form.setFieldsValue({ rating: value })}
                allowHalf
                defaultValue={3}
                count={5}
                size="large"
              />
            </div>
          </Form.Item>

          {/* How was your experience? */}
          <Form.Item
            label="How was your experience?"
            name="feedback"
            rules={[
              { required: true, message: "Please provide your feedback" },
            ]}
          >
            <TextArea
              rows={6}
              placeholder="Add Feedback...."
              style={{ resize: "vertical" }}
            />
          </Form.Item>

          {/* Footer buttons */}
          <Row gutter={12} justify="end" style={{ marginTop: 6 }}>
            <Col>
              <TealOutLineBtn
                onClick={onCancel}
                text="Cancel"
                isLoading={isLoading}
              />
            </Col>
            <Col>
              <TealBtn onClick={handleOk} text="Submit" isLoading={isLoading} />
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Minimal component-scoped styles to reproduce the chip look */}
      <style>
        {`
      .rate-review-modal .ant-modal-content {
        border-radius: 12px;
        overflow: hidden;
      }
      .chip {
        border: 1px solid #e5e7eb;
        padding: 8px 12px;
        border-radius: 9999px;
        background: #f8fafc;
        color: #374151;
        font-size: 13px;
        cursor: pointer;
        transition: all .12s ease;
        box-shadow: none;
      }
      .chip:hover { transform: translateY(-1px); }
      .chip--selected {
        background: #eef6f1;
        border-color: #c9f0d9;
        color: #0b5741;
      }

      .rate-review-modal .ant-input,
      .rate-review-modal .ant-input-affix-wrapper {
        border-radius: 6px;
      }
      .ant-modal-body { padding-top: 8px; }

      .rate-review-modal .ant-modal-header { display:none; }
    `}
      </style>
    </>
  );
}
