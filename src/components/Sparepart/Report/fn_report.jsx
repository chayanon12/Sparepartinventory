import React, { useEffect, useState } from "react";
import { notification, DatePicker, Tag } from "antd";
import ExcelJS from "exceljs";
import axios from "axios";
import { saveAs } from "file-saver";
function fn_report() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [ddlItems, setDdlItems] = useState([]);
  const [ddlCostcenterSelected, setDdlCostcenterSelected] = useState("");
  const [ddlCostcenter, setDdlCostcenter] = useState([]);
  const [ddlItemsselected, setDdlItemsselected] = useState("All");
  const [movemoentTypeSelected, setMovementTypeSelected] = useState("All");
  const [DtDataState, setDtDataState] = useState(false);
  const [DtData, setDtData] = useState([]);
  const { RangePicker } = DatePicker;
  const columns = [
    {
      title: "Stock Status",
      dataIndex: "product_status",
      key: "product_status",
      width: 120,
      fixed:'left',
      className: 'no-scroll',
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
              overflow:'hidden'
            }}
            color={backgroundColor}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Items Status",
      dataIndex: "item_broken_flg",
      key: "item_broken_flg",
      width: 120,
      fixed:'left',
      render: (text, record, index) => {
        const backgroundColor =
          record.item_broken_flg === "Y"
            ? "#f50"
            : record.item_broken_flg != "Y"
            ? "#87d068"
            : "transparent";
        return (
          <Tag
            style={{
              width: 100,
              textAlign: "center",
              padding: "0px 0px 0px 0px",
              overflow:'hidden'
            }}
            color={backgroundColor}
          >
            {text == "Y" ? "Broken" : "Good"}
          </Tag>
        );
      },
    },
    {
      title: "Itams Name",
      dataIndex: "type_name",
      key: "type_name",
      width: 200,
      fixed:'left',
    },
    {
      title: "Serial Number",
      dataIndex: "serial_number",
      key: "serial_number",
      width: 150,
      fixed: 'left',
      className: 'no-scroll',
      render: (text) => (
        <div style={{ 
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis' 
        }}>
          {text}
        </div>
      ),
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
      width: 180,
    },
    {
      title: "Desktop Monitor Serial",
      dataIndex: "desktopmonitor",
      key: "desktopmonitor",
      width: 230,
    },
    {
      title: "Old Desktop Serial",
      dataIndex: "olddesktopserial",
      key: "olddesktopserial",
      width: 180,
    },
    {
      title: "User Contact",
      dataIndex: "usercontact",
      key: "usercontact",
      width: 180,
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
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "User Receive name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "User Receive Dept",
      dataIndex: "dept",
      key: "dept",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
    },
  ];
  const movementTypeOption = [
    {
      value: "All",
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
  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }
  const exportExcelFile = () => {
    console.log(DtData.length);
    if (DtData.length <= 0) {
      notification.error({
        message: "Error",
        description: "Please Search Data First",
        placement: "bottomRight",
        duration: 3,
      });
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 20;

    const excelColumns = columns.map((col) => ({
      header: col.title,
      key: col.dataIndex,
      width: 20,
      style: { alignment: { horizontal: "center" } },
    }));

    sheet.columns = excelColumns;
    excelColumns.forEach((column, index) => {
      const cell = sheet.getCell(1, index + 1);
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    DtData.forEach((data) => {
      if (data.item_broken_flg === "Y") {
        data.item_broken_flg = "Broken";
      }else{
        data.item_broken_flg = "Good";
      }
      const row = sheet.addRow(data);

      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });
    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        const blob = new Blob([buffer], { type: "application/octet-stream" });
        const formattedDateFrom = dateFrom ? formatDate(dateFrom) : "";
        const formattedDateTo = dateTo ? formatDate(dateTo) : "";
        saveAs(
          blob,
          `SpaerPartsReport :${formattedDateFrom} To ${formattedDateTo}.xlsx`
        );
      })
      .catch((error) => {
        console.error("Error writing excel file:", error);
      });
  };
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
    exportExcelFile,
  };
}

export { fn_report };
