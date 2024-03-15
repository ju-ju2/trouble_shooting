import { Table } from "antd";
import { FC, Key, useEffect, useState } from "react";
import type { TableColumnsType } from "antd";
import { faker } from "@faker-js/faker";

interface PaginationProps {}
const Pagination: FC<PaginationProps> = (props) => {
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    job: string;
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Job",
      dataIndex: "job",
    },
  ];

  const [page, setPage] = useState<number>(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const getTableData = (page: number, index: number): DataType => {
    faker.seed(index + 1 + (page - 1) * 5); // 페이지에 따른 테이블 인덱스 번호
    return {
      key: faker.string.uuid(),
      name: faker.person.fullName(),
      age: index + 1 + (page - 1) * 5,
      job: faker.person.jobTitle(),
    };
  };

  const tableData = Array.from({ length: 5 }, (_, index) =>
    getTableData(page, index)
  );

  return (
    <div>
      <Table
        rowSelection={{
          selectedRowKeys,
          onSelect: (record) => {
            // 이미 존재하는 키인지 아닌지 구분
            if (selectedRowKeys.includes(record.key)) {
              setSelectedRowKeys(
                selectedRowKeys.filter((key) => key !== record.key)
              );
            } else {
              setSelectedRowKeys((prev) => [...prev, record.key]);
            }
          },
          onSelectAll: (isSelected, _selectedRows, changeRows) => {
            // isSelected 전체 선택 모드 boolean
            // changeRows : 이미 선택된 체크 항목 이외의 체크 로우들 정보
            if (isSelected) {
              setSelectedRowKeys((prev) => [
                ...prev,
                ...changeRows.map((item) => item.key),
              ]);
            } else {
              setSelectedRowKeys(
                selectedRowKeys.filter(
                  (key) => !changeRows.map((item) => item.key).includes(key)
                )
              );
            }
          },
        }}
        columns={columns}
        dataSource={tableData}
        pagination={{
          onChange: (page) => setPage(page),
          total: 50,
          position: ["bottomCenter"],
        }}
      />
    </div>
  );
};

export default Pagination;
