import { Table } from "antd";
import { FC, useState } from "react";
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

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      name: record.name,
    }),
  };

  return (
    <div>
      <Table
        rowSelection={{
          ...rowSelection,
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
