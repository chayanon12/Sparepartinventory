import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { notification, Tag } from "antd";
import { render } from "react-dom";
function fn_Scanin() {
  const fac = import.meta.env.VITE_FAC;
  const [txtScanValue, setTxtScanValue] = useState("");
  const [ddlvalue, setDdlValue] = useState(null);
  const [requestno, setRequestno] = useState("");
  const [totalSerial, setTotalSerial] = useState(0);
  //dtData
  const [txtSerial, setTxtSerial] = useState([]);
  const [txtSerialGet, setTxtSerialGet] = useState([]);
  const [DtData2, setDtdata] = useState([]);
  const [ddlData, setDdlData] = useState([]);
  //States
  const [ddlDataInState, setDdlDataInState] = useState(false);
  const [DtDataState, setDtDataState] = useState(false);
  const [txtSerialState, setTxtSerialState] = useState(false);
  const [totalSerialState, setTotalSerialState] = useState(false);
  const [txtRequestNOState, setTxtRequestNOState] = useState(false);
  const [txtItemTypeState, setTxtItemTypeState] = useState(false);
  const [txtdataState, setTxtdataState] = useState(false);
  const current_date = dayjs().format("YYYY-MM-DD");
  const [date, setDate] = useState(current_date);
  const [timestamp, setTimestamp] = useState("");
  const columns = [
    {
      title: "Request Number",
      dataIndex: "strRequestno",
      key: "strRequestno",
    },
    {
      title: "Serial Number",
      dataIndex: "strSerialNo",
      key: "strSerialNo",
    },
    {
      title: "Status",
      dataIndex: "strMovementType",
      key: "strMovementType",
      render: (text, record, index) => {
        const backgroundColor =
          record === "OUT"
            ? "#f50"
            : record !== "IN"
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
      title: "Scan in By",
      dataIndex: "adminName",
      key: "adminName",
    },
    {
      title: "Scan In Date",
      dataIndex: "strDate",
      key: "strDate",
    }
  ];
  function SetFocus(txtFile) {
    // document.getElementById(txtFile).focus();
    setTimeout(() => {
      document.getElementById(txtFile).focus();
    }, 100);
  }
  const handleDateChange = (date) => {
    const formatted_date = dayjs(date);
    const now = dayjs();
    const formattedDateWithTime = formatted_date
      .hour(now.hour())
      .minute(now.minute())
      .second(now.second())
      .millisecond(0);

    if (formattedDateWithTime.isBefore(now)) {
      setDate(formattedDateWithTime.format("YYYY-MM-DD"));
      setTimestamp(formattedDateWithTime.format("YYYY-MM-DD HH:mm:ss"));
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
    if (e == "") {
      notification.error({
        message: "Error",
        description: "Please input request number",
        duration: 2,
        placement: "bottomRight",
      });
      SetFocus("txtRequestNO");
      return;
    }
    let checkExitSerial = await submitData("getSerialRequestNo", requestno);
    if (checkExitSerial.serial_number.length > 0) {
      const serialNumbers = checkExitSerial.serial_number.map(
        (item) => item.serial_number
      );
      setTotalSerial(checkExitSerial.amount);
      setTxtSerial(serialNumbers);
      setTxtSerialGet(serialNumbers);
      const selectedOption = ddlData.find(
        (option) => option.typename === checkExitSerial.item_type
      );
      if (!selectedOption) {
        notification.error({
          message: "Error",
          description: "Item Type not found",
          duration: 2,
          placement: "bottomRight",
        });
        setRequestno("");
        SetFocus("txtRequestNO");
        return;
      } else {
        const formatted_date = dayjs(date);
        const now = dayjs();
        const formattedDateWithTime = formatted_date
          .hour(now.hour())
          .minute(now.minute())
          .second(now.second())
          .millisecond(0);
        setTimestamp(formattedDateWithTime.format("YYYY-MM-DD HH:mm:ss"));
        setDate(formattedDateWithTime.format("YYYY-MM-DD"));
        setDdlValue(selectedOption);
      }
      if (checkExitSerial.amount != 0) {
        disableAllField();
        setTimeout(() => {
          SetFocus(`txtSerial_${serialNumbers.length}`);
          // SetFocus("txtSerial_0");
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
    } else {
      setTotalSerial(checkExitSerial.amount);
      const selectedOption = ddlData.find(
        (option) => option.typename === checkExitSerial.item_type
      );
      if (!selectedOption) {
        notification.error({
          message: "Error",
          description: "Item Type not found",
          duration: 2,
          placement: "bottomRight",
        });
        setRequestno("");
        SetFocus("txtRequestNO");
        return;
      } else {
        const formatted_date = dayjs(date);
        const now = dayjs();
        const formattedDateWithTime = formatted_date
          .hour(now.hour())
          .minute(now.minute())
          .second(now.second())
          .millisecond(0);
        setTimestamp(formattedDateWithTime.format("YYYY-MM-DD HH:mm:ss"));
        setDate(formattedDateWithTime.format("YYYY-MM-DD"));
        setDdlValue(selectedOption);
      }
      if (checkExitSerial.amount != 0) {
        disableAllField();
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
    }
  };
  function disableAllField() {
    setTxtItemTypeState(true);
    setTxtRequestNOState(true);
    setTotalSerialState(true);
    setTxtSerialState(true);
    setTxtdataState(true);
  }
  function enableAllField() {
    setTxtItemTypeState(false);
    setTxtRequestNOState(false);
    setTotalSerialState(false);
    setTxtSerialState(false);
    setTxtdataState(false);
  }
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
      disableAllField();
      setTimeout(() => {
        SetFocus(`txtSerial_${txtSerialGet.length}`);
        // SetFocus("txtSerial_0");
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
    enableAllField();
    setTxtScanValue("");
    setDate(current_date);
    setRequestno("");
    setTotalSerial(0);
    setDdlValue(null);
    setDtDataState(false);
    setTxtSerial([]);
    setTxtSerialGet([]);
    SetFocus("txtRequestNO");
  };
  async function submitData(option, params) {
    if (option == "submit") {
      let result = "";
      axios
        .post(
          "/Sparepart/api/common/insertData",
          {
            dataList: {
              strPlantCode: fac,
              strItemId: params.Itemid,
              strMovementType: params.movement,
              strSerialNo: params.Serial,
              strAdminId: params.strAdminId,
              strID: localStorage.getItem("user_empcode"),
              strDate: params.strDate,
              strItemFlg: "NEW",
              strRequestNo: params.requestno,
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
            result = "Data has been saved";
            setTxtScanValue("");
          } else if (response.status === 203) {
            result = "Serial number already exists";
            setTxtScanValue("");
          } else if (response.status === 204) {
            result = "Serial number already Out of stock";
            setTxtScanValue("");
          } else if (response.status === 205) {
            result = "Type is Wrong Please select again!";
            setTxtScanValue("");
          }
          console.log(result, "result");
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
      
      return result;
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
    } else if (option == "getSerialRequestNo") {
      let data = [];
      await axios
        .get(
          `/newarrival/api/getSerialRequestNumberPostgres?strRequestNumber=${params}`
        )
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
    } else if (option == "setRequestNodata") {
     let result = "";
     await axios.post(`/newarrival/api/setReqNoStatusData`, {
      dataList:{
        strPlantCode: fac,
        stritemRemain: params.itemsRemain,
        strReqno: params.requestno,
        strReqStatus: params.ReqStatus
      }
     }).then((res) => {
        result = res.data.result;
     }).catch((err) => {
        alert(err)
     })
     return result;
    }
  }
  const handletxtSerialChange = (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value.trim();
    setTxtSerial(newValues);
    if (event.key === "Enter") {
      if (event.key === "Enter") {
        const nextElement = document.getElementById("txtSerial_" + (index + 1));
        if (nextElement) {
          nextElement.focus();
        } else {
          saveData();
          event.target.blur();
        }
      }
    }
  };
  async function saveData() {
    let data = await preparedata();
    let checkExitSerial = await submitData("getSerialRequestNo", requestno);
    let remainingAmount = 0;
    const dataInsert = data.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.strSerialNo === item.strSerialNo) &&
        !txtSerialGet.includes(item.strSerialNo)
    );
      console.log(data.length, "data.length", checkExitSerial.amount, "checkExitSerial.amount");
      console.log(checkExitSerial.amount, "checkExitSerial", dataInsert.length);
    if (parseInt(checkExitSerial.amount) == parseInt(data.length)) {
      //insert Close Status
      alert('CLOSE')
      remainingAmount = parseInt(checkExitSerial.amount) - parseInt(data.length);
      let insertRequestNodata = await submitData("setRequestNodata", {
        itemsRemain: remainingAmount,
        requestno: requestno,
        ReqStatus: "Close",
      })

      
    } else if (parseInt(checkExitSerial.amount) > parseInt(data.length)) {
      //insert Active Status
      alert('ACTIVE')
      remainingAmount = parseInt(checkExitSerial.amount) - parseInt(data.length);
      let insertRequestNodata = await submitData("setRequestNodata", {
        itemsRemain: remainingAmount,
        requestno: requestno,
        ReqStatus: "Active",
      })
    } else {
      alert('ERROR')
      notification.error({
        message: "Error",
        description: "Serial number not match",
        duration: 2,
        placement: "bottomRight",
      });
      return;
    }
    let SaveDataresult = "";
    
    for (let i = 0; i < dataInsert.length; i++) {
      console.log(i,'i')
      console.log(dataInsert[i].strItemId, "dataInsert[i].strItemId");
      SaveDataresult = await submitData("submit", {
        Itemid: dataInsert[i].strItemId,
        Serial: dataInsert[i].strSerialNo,
        strAdminId: dataInsert[i].strAdminId,
        movement: "IN",
        ID: localStorage.getItem("username"),
        strDate: dataInsert[i].strDate,
        requestno: dataInsert[i].strRequestno,
        remark: "",
      });
    }
    console.log(dataInsert, "dataInsert");
    
    setDtDataState(true);
    setDtdata(dataInsert)

    setTxtSerial("");
    setTxtSerialState(true);
    setDtDataState(true);
  }

  async function preparedata() {
    let data = [];
    for (let i = 0; i < totalSerial; i++) {
      if (txtSerial[i] !== "" && txtSerial[i] !== undefined) {
        data.push({
          seq: i + 1,
          strSerialNo: txtSerial[i],
          strAdminId: localStorage.getItem("username"),
          strItemId: ddlvalue.typeid,
          strPlantCode: fac,
          strDate: timestamp,
          strRequestno: requestno,
          strMovementType: "IN",
          adminId: localStorage.getItem("user_empcode"),
          adminName: localStorage.getItem("username"), 
          remark: "",
        });
      }
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
    txtItemTypeState,
    txtRequestNOState,
    txtdataState,
    txtSerialGet,
    DtData2
  };
}

export { fn_Scanin };
