import { notification, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
function fn_Scanin() {
  // const fac = import.meta.env.VITE_FAC;
  const fac = localStorage.getItem("factory");
  const [txtScanValue, setTxtScanValue] = useState("");
  const [DtData2, setDtdata] = useState([]);
  const [DtDataState, setDtDataState] = useState(false);
  const [ddlvalue, setDdlValue] = useState(null);
  const [ddlDataInState, setDdlDataInState] = useState(false);
  const [ddlData, setDdlData] = useState([]);
  const columns = [
    {
      title: "Stock Status",
      dataIndex: "product_status",
      key: "product_status",
      width: 120,
      // fixed:'left',
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
      // fixed:'left',
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
      title: "Serial Number",
      dataIndex: "serial_number",
      key: "serial_number",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Scan in By",
      dataIndex: "scan_in",
      key: "scan_in",
    },
    {
      title: "Create Date",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "User Receive",
      dataIndex: "scan_out",
      key: "scan_out",
    },
    {
      title: "Update Date",
      dataIndex: "update_date",
      key: "update_date",
    },
  ];
  const filteredDataSource = DtData2.filter((item) => item.status === "IN");
  useEffect(() => {
    submitData("DDL", "");
    submitData("getFac", "");
  }, []);
  const handleScantxtValue_Change = async () => {
    let type = "";
    if (txtScanValue !== "") {
      const splicedValue = txtScanValue.slice(0, 3);
      type = await submitData("getTypeid", splicedValue);

      if (type !== "") {
        await submitData("submit", {
          Itemid: type,
          Serial: txtScanValue,
          Admin: localStorage.getItem("username"),
          movement: "IN",
          ID: "",
        });
      } else {
        if (ddlvalue == null) {
          setDdlDataInState(true);
          notification.error({
            message: "Error",
            description: "Please select type",
            duration: 2,
            placement: "bottomRight",
          });

        
        } else {
          await submitData("submit", {
            Itemid: ddlvalue.typeid,
            Serial: txtScanValue,
            Admin: localStorage.getItem("username"),
            movement: "IN",
            ID: "",
          });
          setDdlValue(null);
        }
      }
    } else {
      document.getElementById("txtScan").focus();
    }
  };


  async function submitData(option, params) {
    if (option == "submit") {
      axios
        .post(
          "/Sparepart/api/common/insertData",
          {
            dataList: {
              strPlantCode: fac,
              strItemId: params.Itemid,
              strMovementType: params.movement,
              strSerialNo: params.Serial,
              strAdminId: params.Admin,
              strID: params.ID,
              strItemFlg: "OLD",
            },
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
        .then((response) => {

          if (response.data.result === "Success" || response.status === 200) {
            notification.success({
              message: "Success",
              description: "Data has been saved",
              duration: 2,
              placement: "bottomRight",
            });
            setTxtScanValue("");
            submitData("getDatawithSerial", params.Serial);
          } else if (response.status === 203) {
            notification.error({
              message: "Error",
              description: "Serial number already exists",
              duration: 2,
              placement: "bottomRight",
            });
            setTxtScanValue("");
            document.getElementById("txtScan").focus();
          } else if (response.status === 204) {
            notification.error({
              message: "Error",
              description: "Serial number already Out of stock",
              duration: 2,
              placement: "bottomRight",
            });
            setTxtScanValue("");
            document.getElementById("txtScan").focus();
          } else if (response.status === 205) {
            notification.error({
              message: "Error",
              description: "Serial number not found",
              duration: 2,
              placement: "bottomRight",
            });
          }
          setDdlValue(null);
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: error,
            duration: 2,
            placement: "bottomRight",
          });

        });
    } else if (option == "getTypeid") {
      let type = "";
      await axios
        .get(
          `/Sparepart/api/common/getData?strType=TYPE&strPlantCode=${fac}&strAbbrName=${params}`
        )
        .then((res) => {
          if (res.data != "") {
            type = res.data[0].typeid;

          } else {
            type = "";
          }
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
            duration: 2,
            placement: "bottomRight",
          });
        });
      return type;
    } else if (option == "getDttable") {
      setDdlDataInState(false);
      await axios
        .get(`/Sparepart/api/common/GetDttableAll?strType=${params}`)
        .then((res) => {
          setDtdata(res.data);
          setDtDataState(true);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
            duration: 2,
            placement: "bottomRight",
          });
        });
    } else if (option == "getIDAdmin") {
      let dtData = [];
      await axios
        .get(
          `/Sparepart/api/common/getCheckIdCodeAdmin?empcode=${params.admin}`
        )
        .then((res) => {
          dtData = res.data;
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
            duration: 2,
            placement: "bottomRight",
          });
        });
      return dtData;
    } else if (option == "DDL") {
      await axios
        .get(`/Sparepart/api/common/getData?strType=DDL&strPlantCode=${fac}`)
        .then((res) => {
          setDdlData(res.data);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
            duration: 2,
            placement: "bottomRight",
          });
        });
    } else if(option == 'getDatawithSerial'){
      let dtData = [];
      await axios
        .get(
          `/Sparepart/api/common/GetDttableFixSerial?plantCode=${fac}&serial=${params}`
        )
        .then((res) => {
          dtData = res.data;
          setDtdata(res.data);
          setDtDataState(true);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
            duration: 2,
            placement: "bottomRight",
          });
        });
      return dtData;
    }
  }

  return {
    txtScanValue,
    setTxtScanValue,
    handleScantxtValue_Change,
    filteredDataSource,
    DtDataState,
    ddlvalue,
    setDdlValue,
    ddlDataInState,
    setDdlDataInState,
    columns,
    ddlData
  };
}

export { fn_Scanin };
