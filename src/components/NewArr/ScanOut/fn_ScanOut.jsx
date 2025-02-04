import React, { useEffect, useState } from "react";
import axios from "axios";
import { notification, Tag } from "antd";
function fn_ScanOut() {
  // const fac = import.meta.env.VITE_FAC;
  const fac = localStorage.getItem("factory");
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
  // const columns = [
  //   {
  //     title: "Serial Number",
  //     dataIndex: "serial_number",
  //     key: "serial_number",
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //   },
  //   {
  //     title: "Scan in By",
  //     dataIndex: "scan_in",
  //     key: "scan_in",
  //   },
  //   {
  //     title: "Create Date",
  //     dataIndex: "create_date",
  //     key: "create_date",
  //   },
  //   {
  //     title: "User Receive",
  //     dataIndex: "scan_out",
  //     key: "scan_out",
  //   },
  //   {
  //     title: "Update Date",
  //     dataIndex: "update_date",
  //     key: "update_date",
  //   },
  // ];
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
              overflow: "hidden",
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
              overflow: "hidden",
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
        notification.error({
          message: "Error",
          description: "ID Code is Wrong",
          placement: "bottomRight",
          duration: 2,
        });
        setuser("");
        document.getElementById("txtScanIDUser").focus();
     
      }
    } else {
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
          strItemFlg: "NEW",
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
              strItemFlg: "NEW",
            });
          } else {
            notification.error({
              message: "Please Key ID Code",
              description: "ID Code is required",
              placement: "bottomRight",
              duration: 2,
            });
            document.getElementById("txtScanIDUser").focus();
          
          }
        }
        if (ddlvalueout == null) {
          
          setDdlDataOutState(true);
          notification.error({
            message: "Please select type",
            description: "Type is required",
            placement: "bottomRight",
            duration: 2,
          });
          document.getElementById("txtScanIDUser").focus();
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
            strItemFlg: "NEW",
          });
        }
      }
    } else {
      notification.error({
        message: "Please Key Serial Number",
        description: "Serial number is required",
        placement: "bottomRight",
        duration: 3,
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
  function resetTxtfield(serial){
    setuser("");
    setusername("");
    setRemark("");
    setDdlFacValue("");
    setTxtScanoutValue("");
    
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
            notification.success({
              message: "Success",
              description: "Data has been saved",
              placement: "bottomRight",
              duration: 2,
            });
            submitData("getDatawithSerial", params.Serial);
            resetTxtfield();
          
          } else if (response.status === 203) {
            notification.error({
              message: "Error",
              description: "Serial number already exists",
              placement: "bottomRight",
              duration: 2,
            });
            resetTxtfield();
          
          } else if (response.status === 204) {
            notification.error({
              message: "Error",
              description: "Serial number already Out of stock",
              placement: "bottomRight",
              duration: 2,
            });
            resetTxtfield();
          
          } else if (response.status === 205) {
            notification.error({
              message: "Error",
              description: "Serial number already In stock",
              placement: "bottomRight",
              duration: 2,
            });
           resetTxtfield();
          }
          setDdlFacValue(null);
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: error,
            placement: "bottomRight",
            duration: 2,
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
      await axios
        .get(`/Sparepart/api/common/GetDttableAll`)
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
    } else if (option == "DDL") {
      await axios
        .get(`/Sparepart/api/common/getData?strType=DDLNEW&strPlantCode=${fac}`)
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
          notification.error({
            message: "Error",
            description: err,
            duration: 2,
            placement: "bottomRight",
          });
        });
      return dtData;
    } else if (option == "getDatawithSerial") {
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
