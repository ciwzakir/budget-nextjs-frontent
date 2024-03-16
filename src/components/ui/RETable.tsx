"use client";
import React from "react";
import { Button, Space, Table, Tag } from "antd";

type ReuseableTableProps = {
  loading?: boolean;
  columns: any;
  dataSource: any;
  pageSize?: number;
  total?: number;
  showPagination?: boolean;
  showSizeChanger?: boolean;
  onChangeOfPagintion?: (page: number, pageSize: number) => void;
  onChangeTable?: (pagination: any, filter: any, sorter: any) => void;
};

const RETable = ({
  loading = false,
  columns,
  dataSource,
  pageSize,
  total,
  showPagination = true,
  showSizeChanger,
  onChangeOfPagintion,
  onChangeTable,
}: ReuseableTableProps) => {
  const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: total,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: showSizeChanger,
        onChange: onChangeOfPagintion,
      }
    : false;

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={paginationConfig}
      onChange={onChangeTable}
    />
  );
};

export default RETable;
