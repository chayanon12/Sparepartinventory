import React, { useEffect, useState } from "react";
import { notification, DatePicker, Tag } from "antd";
import axios from "axios";
function fn_report() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [ddlItems, setDdlItems] = useState([]);
  const [ddlCostcenterSelected, setDdlCostcenterSelected] = useState("");
  const [ddlCostcenter, setDdlCostcenter] = useState([]);
  const [ddlItemsselected, setDdlItemsselected] = useState("ALL");
  const [movemoentTypeSelected, setMovementTypeSelected] = useState("ALL");
  const [DtDataState, setDtDataState] = useState(false);
  const [DtData, setDtData] = useState([]);
  const { RangePicker } = DatePicker;
  const columns = [
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
      title: "Itams Name",
      dataIndex: "type_name",
      key: "type_name",
      width: 100,
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
      width: 120,
    },
    {
      title: "Mac Address",
      dataIndex: "mac_address",
      key: "mac_address",
      width: 120,
    },

    {
      title: "Scan In Date",
      dataIndex: "scan_in_date",
      key: "scan_in_date",
      width: 300,
    },
    {
      title: "Scan Out Date",
      dataIndex: "scan_out_date",
      key: "scan_out_date",
      width: 300,
    },

    {
      title: "Admin Scan In",
      dataIndex: "admin_id",
      key: "admin_id",
      width: 120,
    },
    {
      title: "Admin Scan Out",
      dataIndex: "admin_out_id",
      key: "admin_out_id",
      width: 120,
    },
    {
      title: "User Receive",
      dataIndex: "user_id",
      key: "user_dept",
    },
    {
      title: "User Receive Dept",
      dataIndex: "user_id",
      key: "user_dept",
    },
  ];
  const movementTypeOption = [
    {
      value: "ALL",
      label: "All",
    },
    {
      value: "IN",
      label: "In",
    },
    {
      value: "OUT",
      label: "Out",
    },
  ];
  useEffect(() => {
    getdata("getItem");
    getdata("getCostcenter");
  }, []);
  const onDateChange = (dates, dateStrings) => {
    setDateFrom(dateStrings[0]);
    setDateTo(dateStrings[1]);
  };
  const onSearch = async () => {
    await getdata("getDataReport");
  };
  async function getdata(type, params) {
    try {
      if (type == "getItem") {
        const res = await axios.get(`/Sparepart/api/common/getProductItems`);
        if (res.data != "") {
          setDdlItems(res.data);
        } else {
          notification.error({
            message: "Error",
            description: "Error To get Items",
            placement: "bottomRight",
            duration: 1,
          });
        }
      } else if (type == "getCostcenter") {
        const res = await axios.get(`/Sparepart/api/common/getCostcenter`);
        if (res.data != "") {
          setDdlCostcenter(res.data);
        } else {
          notification.error({
            message: "Error",
            description: "Error To get Items",
            placement: "bottomRight",
            duration: 3,
          });
        }
      } else if (type == "getDataReport") {
        const res = await axios.get(
          `/Sparepart/api/common/getDataReport?typename=${ddlItemsselected}&dept=${ddlCostcenterSelected}&movementtype=${movemoentTypeSelected}&datefrom=${dateFrom}&dateto=${dateTo}`
        );
        console.log(res.data);
        if (res.data.length > 0) {
          setDtData(res.data);
          setDtDataState(true);
          notification.success({
            message: "Success",
            description: "Data Found",
            placement: "bottomRight",
            duration: 3,
          });
        } else {
          setDtDataState(false);
            notification.error({
                message: "Error",
                description: "No Data Found",
                placement: "bottomRight",
                duration: 3,
            });
        }
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
        placement: "bottomRight",
        duration: 3,
      });
    }
  }
  return {
    movementTypeOption,
    movemoentTypeSelected,
    setMovementTypeSelected,
    RangePicker,
    onDateChange,
    ddlItems,
    ddlItemsselected,
    setDdlItemsselected,
    ddlCostcenterSelected,
    setDdlCostcenterSelected,
    ddlCostcenter,
    DtDataState,
    onSearch,
    columns,
    DtData,
  };
}

export { fn_report };
