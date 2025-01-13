import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { notification } from "antd";
function fn_Scanin() {
  const fac = import.meta.env.VITE_FAC;
  const [txtScanValue, setTxtScanValue] = useState("");  
  const [ddlvalue, setDdlValue] = useState(null);    
  const [requestno, setRequestno] = useState("");
  const [totalSerial, setTotalSerial] = useState(0);
  //dtData
  const [txtSerial, setTxtSerial] = useState([]);
  const [DtData2, setDtdata] = useState([]);
  const [ddlData, setDdlData] = useState([]);  
  //States
  const [ddlDataInState, setDdlDataInState] = useState(false);
  const [DtDataState, setDtDataState] = useState(false);
  const [txtSerialState, setTxtSerialState] = useState(false);
  const [totalSerialState, setTotalSerialState] = useState(false);

  const current_date = dayjs().format("YYYY-MM-DD");  
  const [date, setDate] = useState(current_date);
  const columns = [
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
  function SetFocus(txtFile) {
    document.getElementById(txtFile).focus();
  }
  const handleDateChange = (date) => {
    const formatted_date = dayjs(date);
    const now = dayjs();

    if (formatted_date.isBefore(now)) {
      setDate(formatted_date.format("YYYY-MM-DD"));
    } else {
      setDate("");
      notification.error({
        message: "Error",
        description: "Please select date before today",
        duration: 2,
        placement: "bottomRight",
      });
    }
  };
  const filteredDataSource = DtData2.filter((item) => item.status === "IN");
  useEffect(() => {
    submitData("DDL", "");
    submitData("getFac", "");
  }, []);
  const handleScantxtValue_Change = async () => {
    let type = "";
    if (txtScanValue !== "") {
      const splicedValue = txtScanValue.slice(0, 3);
      if (ddlvalue == null) {
        type = await submitData("getTypeid", splicedValue);
      }

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
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please select type",
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
      SetFocus("txtScan");
    }
  };
  const handle_RequestNO_Change = async (e) => {
    console.log(e);
    if (e == "") {
      SetFocus("txtRequestNO");
      return;
    }
    let requestNumberdata = await submitData("getdataRequestNo", requestno);
    console.log(requestNumberdata);
    if (requestNumberdata.length < 1) {
      notification.error({
        message: "Error",
        description: "Not Found Data Please Type Again",
        duration: 2,
        placement: "bottomRight",
      });
      setRequestno("");
      SetFocus("txtRequestNO");
    } else {
      setTotalSerial(requestNumberdata.amount);
      console.log(requestNumberdata.item_type);
      setDdlValue({ typename: requestNumberdata.item_type });
      SetFocus("txtTotalSerial");
    }
  };
  const btnExecute_Click = async () => {
    if (requestno == "") {
      notification.error({
        message: "Error",
        description: "Please input request number",
        duration: 2,
        placement: "bottomRight",
      });
      SetFocus("txtRequestNO");
      return;
    }
    if (totalSerial != 0) {
      setTxtSerialState(true);
      setTotalSerialState(true);
      setTimeout(() => {
        SetFocus("txtSerial_0");
      }, 200);
    } else {
      notification.error({
        message: "Error",
        description: "Request number not found",
        duration: 2,
        placement: "bottomRight",
      });
      SetFocus("txtTotalSerial");
    }
  };
  const btnCancel_Click = () => {
    setTxtSerialState(false);
    setTxtScanValue("");
    setDate(current_date);
    setRequestno("");
    setTotalSerial(0);
    setDdlValue(null);
    setDtDataState(false);
    setTotalSerialState(false);
    setTxtSerial([]);
    SetFocus("txtRequestNO");
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
              strItemFlg: "NEW",
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
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Data has been saved",
            }).then(() => {
              setTxtScanValue("");
              submitData("getDttable", "");
            });
          } else if (response.status === 203) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Serial number already exists",
            }).then(() => {
              setTxtScanValue("");
              submitData("getDttable", "");
            });
          } else if (response.status === 204) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Serial number already Out of stock",
            }).then(() => {
              setTxtScanValue("");
              submitData("getDttable", "");
            });
          } else if (response.status === 205) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Type is Wrong Please select again!",
            }).then(() => {
              submitData("getDttable", "");
            });
          }
          setDdlValue(null);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error,
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
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err,
          });
        });
      return type;
    } else if (option == "getDttable") {
      setDdlDataInState(false);
      await axios
        .get(`/Sparepart/api/common/GetDttableAll?strType=NEW`)
        .then((res) => {
          setDtdata(res.data);
          setDtDataState(true);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err,
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
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err,
          });
        });
      return dtData;
    } else if (option == "DDL") {
      await axios
        .get(`/Sparepart/api/common/getData?strType=DDLNEW&strPlantCode=${fac}`)
        .then((res) => {
          setDdlData(res.data);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err,
          });
        });
    } else if (option == "getdataRequestNo") {
      let data = [];
      await axios
        .get(`/newarrival/api/getdataRequestNumber?strRequestNumber=${params}`)
        .then((res) => {
          data = res.data;
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
            duration: 2,
            placement: "bottomRight",
          });
        });
      return data;
    }
  }
  const handletxtSerialChange = (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value.trim();
    setTxtSerial(newValues);
    if (event.key === "Enter") {
      try {
        SetFocus("txtSerial_" + (index + 1));
      } catch (error) {
        saveData();
        event.target.blur();
      }
    }
  };
  async function saveData() {
    console.log(txtSerial);
    let data = await preparedata(); 
    console.log(data);
    setTxtSerial("");
    setTxtSerialState(true);
    setDtDataState(true);
  }
  async function preparedata() {
    // strPlantCode: fac,
    //           strItemId: params.Itemid,
    //           strMovementType: params.movement,
    //           strSerialNo: params.Serial,
    //           strAdminId: params.Admin,
    //           strID: params.ID,
    //           strItemFlg: "NEW",
    let data = [];
    console.log(ddlvalue)
    for(let i = 0; i < totalSerial; i++){
      data.push({
        seq: i + 1,
        strSerialNo: txtSerial[i],
        strAdminId: localStorage.getItem("username"),
        strItemId:ddlvalue.typeid,
        strPlantCode: fac,
      });
    }
    return data;
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
    ddlData,
    date,
    setDate,
    handleDateChange,
    totalSerial,
    setTotalSerial,
    requestno,
    setRequestno,
    txtSerialState,
    setTxtSerialState,
    btnExecute_Click,
    btnCancel_Click,
    handletxtSerialChange,
    txtSerial,
    setTxtSerial,
    totalSerialState,
    handle_RequestNO_Change,
    saveData,
  };
}

export { fn_Scanin };
