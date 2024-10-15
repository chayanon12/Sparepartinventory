import React, { useEffect, useState } from "react";
import { Button, Card, Flex, Select, Input, Table, Tag } from "antd";
import './CheckSerial.css';
import axios from "axios";
import Swal from "sweetalert2";
function fn_CcheckSerial() {
  const [serialNumber, setSerialNumber] = useState("");
  const [DtDataState, setDtDataState] = useState(false);
  const [DtData, setDtData] = useState([]);
  const [ddlItems, setDdlItems] = useState([]);
  const [ddlItemsValue, setDdlItemsValue] = useState({
    lable:'ALL',
    value:0
  });
  const { Search } = Input;
  useEffect(() => {
    Pageload();
  }, []);
  async function Pageload() {
    try {
      const res = await axios.get(`/Sparepart/api/common/getProductItems`);
      if (res.data != "") {
        setDdlItems(res.data);
      }
    } catch (error) {
      setDtDataState(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  }
  const columns = [
    {
      title: "Itams Name",
      dataIndex: "type_name",
      key: "type_name",
      width: 150,
    },
    {
      title: "Serial Number",
      dataIndex: "serial_number",
      key: "serial_number",
      width: 150,
    },
    {
      title: "Item Name",
      dataIndex: "item_name",
      key: "item_name",
      width: 150,
    },
    {
      title: "Mac Address",
      dataIndex: "mac_address",
      key: "mac_address",
      width: 180,
    },
    {
      title: "Items Status",
      dataIndex: "product_status",
      key: "product_status",
      width: 120,
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
      width: 200,
    },
    {
      title: "Scan Out Date",
      dataIndex: "scan_out_date",
      key: "scan_out_date",
      width: 200,
    },

    {
      title: "Admin Scan In",
      dataIndex: "admin_id",
      key: "admin_id",
      width: 150,
    },
    {
      title: "Admin Scan Out",
      dataIndex: "admin_out_id",
      key: "admin_out_id",
      width: 150,
    },
    {
      title: "User Receive",
      dataIndex: "user_dept",
      key: "user_dept",
      width: 150,
    },
  ];
  const onSearch = async () => {
    if (serialNumber == "" && ddlItemsValue == "") {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please Select items or Input Serial Number",
      });
      return;
    }
    try {
      const res = await axios.get(`/Sparepart/api/common/getCheckSerial`, {
        params: {
          serial_number: serialNumber,
          items:ddlItemsValue
        },
      });
      if (res.data != "") {
        setDtDataState(true);
        setDtData(res.data);
      }else{
        setDtDataState(false);
        Swal.fire({
          icon: "error",
          title: "error",
          text: "No Data Found",
        });
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
  return {
    columns,
    onSearch,
    setSerialNumber,
    serialNumber,
    DtDataState,
    DtData,
    Search,
    ddlItems,
    ddlItemsValue, setDdlItemsValue
  };
}

export { fn_CcheckSerial };
