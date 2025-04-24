import React, { useState } from "react";
import { Table, Input, Pagination } from "antd";

const { Search } = Input;

const TableSearch = ({
  data = [],
  columns,
  isLoading,
  pageSize = 10,
  pageNumber = 1,
  pagination = {},
  handleSearch,
  handlePaginationChange,
}) => {
  const start = (pageNumber - 1) * pageSize + 1;
  const end = Math.min(start + pageSize - 1, data.length);

  return (
    <div className="mt-4">
      <Search
        placeholder={"Search name"}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className="mb-4 w-full max-w-[300px]"
        allowClear
      />
      <div className="w-full">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="ID"
          pagination={false} // Ẩn pagination mặc định
          scroll={{ x: "max-content" }}
          className="w-full"
          loading={isLoading}
          components={{
            header: {
              wrapper: (props) => (
                <thead
                  {...props}
                  className={`bg-tableHeadColor text-primaryTextColor`}
                />
              ),
              cell: (props) => (
                <th
                  {...props}
                  className={` bg-[#E6F0FA] text-[10px] font-[700] md:text-[16px] text-[#637381] tracking-wider text-center !py-4 px-0 whitespace-nowrap `}
                />
              ),
            },
            body: {
              cell: (props) => (
                <td
                  {...props}
                  className={`font-[500] tracking-wider text-center py-4 px-0 whitespace-nowrap text-[10px] md:text-[14px] text-[#637381] ${props.className || ""}`}
                />
              ),
            },
          }}
        />
        <div className="flex justify-between items-center mt-2 px-4">
          <span className="text-gray-500 text-sm">{`Showing ${start}-${end} of ${pagination.totalItems}`}</span>
          <Pagination
            current={pageNumber}
            pageSize={pageSize}
            total={pagination.totalItems}
            onChange={(page, size) => {
              handlePaginationChange(page, size);
            }}
            showSizeChanger={true}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        </div>
      </div>
    </div>
  );
};

export default TableSearch;
