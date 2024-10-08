import React, { useState } from "react";
import { Button, Card, Flex, Select, Input, Table, Tag } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";
import { render } from "react-dom";
function CheckSerial() {
  const { Search } = Input;
  const [serialNumber, setSerialNumber] = useState("");
  const [DtDataState, setDtDataState] = useState(false);
  const [DtData, setDtData] = useState([]);
  const columns = [
    {
      title: "Itams Name",
      dataIndex: "type_name",
      key: "type_name",
    },
    {
      title: "Serial Number",
      dataIndex: "serial_number",
      key: "serial_number",
    },
    {
      title: "Items Status",
      dataIndex: "product_status",
      key: "product_status",
      render: (text, record, index) => {
        const backgroundColor =
          record.product_status === "OUTSTOCK"
            ? "#f50"
            : record.product_status !== "OUTSTOCK"
            ? "#87d068"
            : "transparent";

        return (
          <Tag
            style={{
              width: 100,
              textAlign: "center",
              padding: "0px 0px 0px 0px",
            }}
            color={backgroundColor}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Scan In Date",
      dataIndex: "scan_in_date",
      key: "scan_in_date",
    },
    {
      title: "Scan Out Date",
      dataIndex: "scan_out_date",
      key: "scan_out_date",
    },

    {
      title: "Admin Scan In",
      dataIndex: "admin_id",
      key: "admin_id",
    },
    {
      title: "Admin Scan Out",
      dataIndex: "admin_out_id",
      key: "admin_out_id",
    },
    {
      title: "User Receive",
      dataIndex: "user_dept",
      key: "user_dept",
    },
  ];
  const onSearch = async () => {
    console.log(serialNumber);
    try {
      const res = await axios.get(`/Sparepart/api/common/getCheckSerial`, {
        params: {
          serial_number: serialNumber,
        },
      });
      if (res.data != "") {
        setDtDataState(true);
        setDtData(res.data);
      }
    } catch (error) {
      setDtDataState(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };
  return (
    <Flex gap="10px">
      <Card
        className="openCard"
        style={{
          width: "1250px",
          maxHeight: "630px",
          margin: "0 auto",
          overflow: "auto",
        }}
      >
        <Search
          id="SearchSerial"
          placeholder="Input Serial Number"
          allowClear
          enterButton="Search"
          size="large"
          prefix={<FileSearchOutlined />}
          style={{ width: 400 }}
          onChange={(e) => setSerialNumber(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          onSearch={onSearch}
        />
        {DtDataState && (
          <Table
            className="TableCheck"
            columns={columns}
            dataSource={DtData}
            pagination={{
              pageSize: 6,
            }}
          />
        )}
      </Card>
    </Flex>
  );
}

export default CheckSerial;
