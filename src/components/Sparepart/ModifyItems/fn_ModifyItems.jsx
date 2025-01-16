import React, { useState } from "react";
import { Input, notification, Tag } from "antd";
import axios from "axios";
function fn_ModifyItems() {
  const [serialNumber, setSerialNumber] = useState("");
  const [itemname, setItemname] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [fixAssetsCode, setFixAssetsCode] = useState("");
  const [UpdatebtnDisable, setUpdatebtnDisable] = useState(true);
  const [DtDataState, setDtDataState] = useState(false);
  const [DtData, setDtData] = useState([]);
  const [DesktopMonitor, setDesktopMonitor] = useState("");
  const [olddesktopserial, setOlddesktopserial] = useState("");
  const [usercontact, setUsercontact] = useState("");
  const { Search } = Input;
  const clearTextFields = () => {
    setItemname("");
    setMacAddress("");
    setFixAssetsCode("");
    setUpdatebtnDisable(true);
    setDesktopMonitor("");
    setOlddesktopserial("");
    setUsercontact("");
  };
  const onSearch = () => {
    setDtDataState(false);
    if (serialNumber == "") {
      notification.error({
        message: "Warning",
        description: "Please input Serial Number",
        placement: "bottomRight",
        duration: 2.5,
      });
      document.getElementById("SearchSerial").focus();
      clearTextFields();
      return;
    }

    getdata("getSearchSerial", serialNumber);
  };
  const onUpdateData = async () => {
    await getdata("UpdateData");
    await getdata("CheckDataafterUpdated");
    setSerialNumber("");
    document.getElementById("SearchSerial").focus();
  };
  console.log(DesktopMonitor, olddesktopserial, usercontact);
  async function getdata(type, params) {
    try {
      if (type == "getSearchSerial") {
        const res = await axios.get(
          `/Sparepart/api/common/getModifyData?serialNo=${params}`
        );
        if (res.data != "") {
          setUpdatebtnDisable(false);
          setFixAssetsCode(res.data.fix_assets_code || "");
          setItemname(res.data.item_name || "");
          setMacAddress(res.data.mac_address || "");
          setDesktopMonitor(res.data.pc_monitor_serial || "");
          setOlddesktopserial(res.data.pc_old_serial || "");
          setUsercontact(res.data.user_contact || "");
          if (res.data.item_name == null || res.data.item_name == "") {
            document.getElementById("txtItemName").focus();
          } else if (res.data.mac_address == null ||res.data.mac_address == "") {
            document.getElementById("txtMacAddress").focus();
          } else if(res.data.fix_assets_code == null ||res.data.fix_assets_code == "") {
            document.getElementById("txtFixAssetsCode").focus();
          } else if(res.data.pc_monitor_serial == null ||res.data.pc_monitor_serial == "") {
            document.getElementById("txtDesktopMonitor").focus();
          } else if(res.data.pc_old_serial == null ||res.data.pc_old_serial == "") {
            document.getElementById("txtOldDesktopSerial").focus();
          } else if(res.data.user_contact == null ||res.data.user_contact == "") {
            document.getElementById("txtUserContact").focus();
          }
        } else {
          setSerialNumber("");
          clearTextFields();
          notification.error({
            message: "Warning",
            description: "No Data Please Key Serial Number Again",
            placement: "bottomRight",
            duration: 2.5,
          });
          document.getElementById("SearchSerial").focus();
        }
      } else if (type == "UpdateData") {
        const res = await axios.post(`/Sparepart/api/common/updateModifyData`, {
          dataList: {
            item_name: itemname,
            mac_address: macAddress,
            fix_assets_code: fixAssetsCode,
            serialNo: serialNumber,
            pc_monitor_serial: DesktopMonitor,
            pc_old_serial: olddesktopserial,
            user_contact: usercontact,
          },
        });
        if (res.data.Status == "Success") {
          notification.success({
            message: "Success",
            description: "Data Updated",
            placement: "bottomRight",
            duration: 2.5,
          });
          setUpdatebtnDisable(true);
          setSerialNumber("");
          setItemname("");
          setMacAddress("");
          setFixAssetsCode("");
          setDesktopMonitor("");
          setOlddesktopserial("");
          setUsercontact("");
        } else {
          notification.error({
            message: "Error",
            description: "Data Not Updated",
            placement: "bottomRight",
            duration: 2.5,
          });
        }
      } else if (type == "CheckDataafterUpdated") {
        const res = await axios.get(`/Sparepart/api/common/getCheckSerial`, {
          params: {
            serial_number: serialNumber,
          },
        });
        if (res.data != "") {
          setDtDataState(true);
          setDtData(res.data);
        } else {
          setDtDataState(false);
          notification.error({
            message: "Warning",
            description: "No Data Found",
            placement: "bottomRight",
            duration: 2.5,
          });
        }
      }
    } catch (error) {
      alert(error);
    }
  }
  const columns = [
    {
      title: "Itams Name",
      dataIndex: "type_name",
      key: "type_name",
      width: 130,
    },
    {
      title: "Serial Number",
      dataIndex: "serial_number",
      key: "serial_number",
      width: 180,
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
      width: 150,
    },
    {
      title: "Fix Assets Code",
      dataIndex: "fix_assets_code",
      key: "fix_assets_code",
      width: 150,
    },
    {
      title: "Desktop Monitor",
      dataIndex: "pc_monitor_serial",
      key: "pc_monitor_serial",
      width: 150,
    },
    {
      title: "OLD PC Serial",
      dataIndex: "pc_old_serial",
      key: "pc_old_serial",
      width: 150,
    },
    {
      title: "User Contact",
      dataIndex: "user_contact",
      key: "user_contact",
      width: 120,
    },
    {
      title: "Items Status",
      dataIndex: "product_status",
      key: "product_status",
      width: 100,
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
  ];

  return {
    serialNumber,
    setSerialNumber,
    Search,
    onSearch,
    itemname,
    setItemname,
    macAddress,
    setMacAddress,
    fixAssetsCode,
    setFixAssetsCode,
    onUpdateData,
    UpdatebtnDisable,
    DtDataState,
    DtData,
    columns,
    DesktopMonitor,
    setDesktopMonitor,
    olddesktopserial,
    setOlddesktopserial,
    usercontact,
    setUsercontact,
  };
}

export { fn_ModifyItems };
