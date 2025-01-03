import React, { useState } from "react";
import { Input,Tag } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
function fn_ModifyItems() {
  const [serialNumber, setSerialNumber] = useState("");
  const [itemname, setItemname] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [fixAssetsCode, setFixAssetsCode] = useState("");
  const [UpdatebtnDisable, setUpdatebtnDisable] = useState(true);
  const [DtDataState, setDtDataState] = useState(false);
  const [DtData, setDtData] = useState([]);
  const { Search } = Input;
  const clearTextFields = () => {
    setItemname("");
    setMacAddress("");
    setFixAssetsCode("");
    setUpdatebtnDisable(true);
  }
  const onSearch = () => {
    
    setDtDataState(false);
    if (serialNumber == "") {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please input Serial Number",
      }).then(() => {
        
        document.getElementById("SearchSerial").focus();
        clearTextFields();
      });
      return;
    }
    
    getdata("getSearchSerial", serialNumber);
  };
  const onUpdateData = async() => {
    await getdata("UpdateData");
    await getdata("CheckDataafterUpdated");
  };

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

          if (res.data.item_name == null || res.data.item_name == "") {
            document.getElementById("txtItemName").focus();
          } else if (
            res.data.mac_address == null ||
            res.data.mac_address == ""
          ) {
            document.getElementById("txtMacAddress").focus();
          } else {
            document.getElementById("txtFixAssetsCode").focus();
          }
        } else {
          setSerialNumber("");
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "No Data Please Key Serial Number Again",
          }).then(() => {
            document.getElementById("SearchSerial").focus();
          });
        }
      } else if (type == "UpdateData") {
        const res = await axios.post(`/Sparepart/api/common/updateModifyData`, {
          dataList: {
            item_name: itemname,
            mac_address: macAddress,
            fix_assets_code: fixAssetsCode,
            serialNo: serialNumber,
          },
        });
        if (res.data.Status == "Success") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data Updated",
          });
          setUpdatebtnDisable(true);
          setSerialNumber("");
          setItemname("");
          setMacAddress("");
          setFixAssetsCode("");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Data Not Updated",
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
          }else{
            setDtDataState(false);
            Swal.fire({
              icon: "error",
              title: "error",
              text: "No Data Found",
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
      title: "Admin Scan In",
      dataIndex: "admin_id",
      key: "admin_id",
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
    columns
  };
}

export { fn_ModifyItems };
