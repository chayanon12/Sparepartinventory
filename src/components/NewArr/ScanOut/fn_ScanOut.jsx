import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { notification } from "antd";
function fn_ScanOut() {
  const fac = import.meta.env.VITE_FAC;
  const [txtScanoutValue, setTxtScanoutValue] = useState("");
  const [DtData2, setDtdata] = useState([]);
  const [DtDataState, setDtDataState] = useState(false);
  const [ddlData, setDdlData] = useState([]);
  const [ddlvalueout, setDdlValueout] = useState(null);
  const [ddlFacValue, setDdlFacValue] = useState("");
  const [ddlDataOutState, setDdlDataOutState] = useState(false);
  const [ddlFacRequire, setDdlFacRequire] = useState(false);
  const [user, setuser] = useState("");
  const [username, setusername] = useState("");
  const [Remark, setRemark] = useState("");
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
  const filteredDataSource2 = DtData2.filter((item) => item.status === "OUT");
  useEffect(() => {
    submitData("DDL", "");
    submitData("getFac", "");
  }, []);
  const handleScantxtIDUserValue_Change = async () => {
    if (user !== "") {
      let dtData = await submitData("getIDUser", { user: user, flg: "user" });

      if (dtData.length > 0) {
        document.getElementById("txtScanOut").focus();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "ID Code is Wrong",
        }).then(() => {
          setuser("");
          document.getElementById("txtScanIDUser").focus();
        });
      }
    } else {
      // document.getElementById("txtScanIDUser").focus();
    }
  };
  
  const handleScanouttxtValue_Change = async () => {
    let type = "";
    if (Remark == ''){
      notification.error({
        message: "Please Key Remark",
        description: "remark is required",
        placement: "bottomRight",
        duration: 3,
      });
      document.getElementById("txtScanOutRemark").focus();
      return;
    }
    if (txtScanoutValue !== "") {
      console.log("ddlvalueout", ddlvalueout);
      const splicedValue = txtScanoutValue.slice(0, 3);
      if(ddlvalueout == null){
        type = await submitData("getTypeid", splicedValue);
      }      
      if (user !== "") {
        await submitData("submit", {
          Itemid: type == "" ? ddlvalueout.typeid : type,
          Serial: txtScanoutValue,
          Admin: localStorage.getItem("username"),
          movement: "OUT",
          ID: user,
          UserDept: ddlFacValue,
          UserName: username,
          Remark: Remark,
        });
      } else {
        if (username == "" || user == "" || ddlFacValue == "") {
          if (Remark != "") {
            await submitData("submit", {
              Itemid: ddlvalueout.typeid,
              Serial: txtScanoutValue,
              Admin: localStorage.getItem("username"),
              movement: "OUT",
              ID: "",
              UserDept: "",
              UserName: "",
              Remark: Remark,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Please Key ID Code",
            }).then(() => {
              document.getElementById("txtScanIDUser").focus();
            });
          }
        }
        if (ddlvalueout == null) {
          
          setDdlDataOutState(true);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please select type",
          }).then(() => {
            document.getElementById("txtScanIDUser").focus();
          });
        } else {                                                                           
          await submitData("submit", {
            Itemid: ddlvalueout.typeid,
            Serial: txtScanoutValue,
            Admin: localStorage.getItem("username"),
            movement: "OUT",
            ID: user,
            UserDept: ddlFacValue,
            UserName: username,
            Remark: Remark,
          });
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Key Serial Number",
      });

      document.getElementById("txtScan").focus();
    }
  };
  const btnCancel = () => {
    setTxtScanoutValue("");
    setDdlValueout(null);
    setDdlFacValue("");
    setuser("");
    setusername("");
    setRemark("");
    setDtDataState(false);
  };
  function resetTxtfield(){
    setuser("");
    setusername("");
    setRemark("");
    setDdlFacValue("");
    setTxtScanoutValue("");
    submitData("getDttable", "");
  }
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
              strUserDept: params.UserDept,
              strUserName: params.UserName,
              strRemark: params.Remark,
              strItemFlg:'NEW'
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
              resetTxtfield();
            });
          } else if (response.status === 203) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Serial number already exists",
            }).then(() => {
              resetTxtfield();
            });
          } else if (response.status === 204) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Serial number already Out of stock",
            }).then(() => {
              resetTxtfield();
            });
          } else if (response.status === 205) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Type is Wrong Please select again!",
            }).then(() => {
              resetTxtfield();
            });
          }
          setDdlValueout(null);
          setDdlFacValue(null);
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
      await axios
        .get(`/Sparepart/api/common/GetDttableAll`)
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
    } else if (option == "getIDUser") {
      let dtData = [];
      await axios
        .get(`/Sparepart/api/common/getCheckIdCodeUser?empcode=${params.user}`)
        .then((res) => {
          dtData = res.data;
          if (res.data.length > 0) {
            setDdlFacValue(res.data[0].cost_center.substring(0, 4));
            setusername(res.data[0].ename);
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err,
          });
        });
      return dtData;
    }
  }
  return {
    txtScanoutValue,
    setTxtScanoutValue,
    handleScanouttxtValue_Change,
    DtDataState,
    ddlvalueout,
    setDdlValueout,
    ddlData,
    ddlDataOutState,
    setDdlDataOutState,
    ddlFacValue,
    setDdlFacValue,
    ddlFacRequire,
    setDdlFacRequire,
    filteredDataSource2,
    columns,
    user,
    setuser,
    handleScantxtIDUserValue_Change,
    username,
    setusername,
    Remark,
    setRemark,
    btnCancel,
  };
}

export { fn_ScanOut };
