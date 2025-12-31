import { Button } from "antd";

export default function AuthButton({
  text,
  onClick = undefined,
  isLoading = false,
}) {
  return (
    <div className="teal-btn">
      <Button
        loading={isLoading}
        block
        onClick={onClick}
        type="primary"
        htmlType="submit"
        className="!bg-[#144A6C] !font-open-sans !text-[16px]  !font-semibold "
      >
        {text}
      </Button>

      <style jsx>{`
        :global(.teal-btn .ant-btn) {
          height: 50px;
          line-height: 32px;
        }
      `}</style>
    </div>
  );
}
