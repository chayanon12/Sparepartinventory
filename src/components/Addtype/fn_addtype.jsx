import axios from "axios";
import React, { useEffect, useState } from "react";
import { notification } from "antd";
function fn_addtype() {
  const [txtItemName, setTxtItemName] = useState("");
  const [txtItemType, setTxtItemType] = useState("");
  const [DtDataState, setDtDataState] = useState(false);

  const columns = [
    {
      title: "Itams Name",
      dataIndex: "type_name",
      key: "type_name",
      width: 130,
    },
    {
      title: "Itams Type",
      dataIndex: "type_product",
      key: "type_name",
      width: 130,
    },
  ];
  const [DtData, setDtData] = useState([]);
  useEffect(() => {
    // pageLoad();
  }, []);
  async function pageLoad() {
    await getdata("getTypeData");
  }
  async function Checktype() {
    await getdata("getTypeData");
    setDtDataState(true);
  }
  const submitData = async () => {
    if (txtItemName !== "" && txtItemType !== "") {
      await getdata("addType", {
        type_name: txtItemName,
        type_product: txtItemType,
      });
      clearTxt();
    }
  };
  async function getdata(type, params) {
    try {
      if (type == "getTypeData") {
        setDtDataState(false);
        const res = await axios.get("/Sparepart/api/common/getType");
        if (res.data != "") {
          setDtData(res.data);
          setDtDataState(true);
        } else {
          notification.error({
            message: "Error",
            description: "No Data Found",
            placement: "bottomRight",
            duration: 3,
          });
        }
      } else if (type == "addType") {
        const res = await axios.post("/Sparepart/api/common/addNewType", {
          type_name: params.type_name,
          type_product: params.type_product,
        });
        if (res.data.state == "Success") {
          notification.success({
            message: "success",
            description: "Data Added Successfully",
            placement: "bottomRight",
            duration: 3,
          });
          Checktype();
        } else {
          notification.error({
            message: "Error",
            description: "Can't Add Data Please try again",
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
        duration: 1,
      });
    }
  }
  function clearTxt() {
    setTxtItemName("");
    setTxtItemType("");
  }
  return {
    columns,
    DtData,
    txtItemName,
    setTxtItemName,
    txtItemType,
    setTxtItemType,
    DtDataState,
    Checktype,
    submitData,
  };
}

export { fn_addtype };
