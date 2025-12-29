"use client";
import "@/styles/Pagination.css";
import { Pagination } from "antd";

export default function CustomPagination({
  total,
  page_size,
  currentPage,
  onPageChange,
}) {
  // const [currentPage, setCurrentPage] = useState(current)

  return (
    <div>
      <Pagination
        align="center"
        defaultCurrent={1}
        current={currentPage}
        onChange={onPageChange}
        total={total}
        pageSize={page_size}
        showSizeChanger={false}
        hideOnSinglePage
      />
    </div>
  );
}
