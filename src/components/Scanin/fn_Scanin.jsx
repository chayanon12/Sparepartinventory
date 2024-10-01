import { ConsoleSqlOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { CiBaseball } from "react-icons/ci";
import Swal from "sweetalert2";

function fn_Scanin() {
  const fac = import.meta.env.VITE_FAC;
  const [txtScanValue, setTxtScanValue] = useState("");
  const [txtScanoutValue, setTxtScanoutValue] = useState("");
  const [DtData2, setDtdata] = useState([]);
  const [DtDataState, setDtDataState] = useState(false);
  const [ddlData, setDdlData] = useState([]);
  const [ddlvalue, setDdlValue] = useState(null);

  const [ddlDataout, setDdlDataout] = useState([]);
  const [ddlvalueout, setDdlValueout] = useState(null);
  const [ddlFac, setDdlFac] = useState([]);
  const [ddlFacValue, setDdlFacValue] = useState(null);

  const [ddlDataInState, setDdlDataInState] = useState(false);
  const [ddlDataOutState, setDdlDataOutState] = useState(false);
  const [ddlFacRequire , setDdlFacRequire] = useState(false);
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
      title: "Scan Out By",
      dataIndex: "scan_out",
      key: "scan_out",
    },
    {
      title: "Update Date",
      dataIndex: "update_date",
      key: "update_date",
    },
  ];
  const filteredDataSource = DtData2.filter(item => item.status === 'IN');
  const filteredDataSource2 = DtData2.filter(item => item.status === 'OUT');
  useEffect(() => {
    submitData("DDL", "");
    submitData("getFac", "");
    if (txtScanValue == "") {
      document.getElementById("txtScan").focus();
    }
  }, [txtScanValue]);
  const handleScantxtValue_Change = async () => {
    let type = "";
    if (txtScanValue !== "") {
      const splicedValue = txtScanValue.slice(0, 3);
      type = await submitData("getTypeid", splicedValue);
      console.log(type);
      if (type !== "") {
        await submitData("submit", {
          Itemid: type,
          Serial: txtScanValue,
          Admin: "POND",
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
            Admin: "POND",
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
  const handleScanouttxtValue_Change = async () => {
    let type = "";
    console.log(ddlFacValue);
    if (txtScanoutValue !== "") {
      const splicedValue = txtScanoutValue.slice(0, 3);
      type = await submitData("getTypeid", splicedValue);
      if (type !== "" && ddlFacValue.value !== '') {
        await submitData("submit", {
          Itemid: type,
          Serial: txtScanoutValue,
          Admin: "POND",
          movement: "OUT",
          ID: ddlFacValue.value,
        });
      } else {
        if (ddlvalueout == null) {
          setDdlDataOutState(true);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please select type",
          }).then(() => {
            document.getElementById("autoCompleteout").focus();
          });
        }else if(ddlFacValue.value == null){
          setDdlFacRequire(true)
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please select Dept",
          }).then(() => {
            document.getElementById("ddlFac").focus();
          });

        } else {
          await submitData("submit", {
            Itemid: ddlvalueout.typeid,
            Serial: txtScanoutValue,
            Admin: "POND",
            movement: "OUT",
            ID: ddlFacValue.value,
          });
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
            },
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.result === "Success" || response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Data has been saved",
            }).then(() => {
              setTxtScanValue("");
              setTxtScanoutValue("");
              console.log("submitData");
              submitData("getDttable", "");
            });
          } else if (response.status === 203) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Serial number already exists",
            }).then(() => {
              setTxtScanValue("");
              setTxtScanoutValue("");
              submitData("getDttable", "");
            });
          } else if (response.status === 204) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Serial number already Out of stock",
            }).then(() => {
              setTxtScanValue("");
              setTxtScanoutValue("");
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
      setDdlDataInState(false);
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
        .get(`/Sparepart/api/common/getData?strType=DDL&strPlantCode=${fac}`)
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
    } else if (option == "getFac"){
      await axios
        .get(`/Sparepart/api/common/getfac`)
        .then((res) => {
          setDdlFac(res.data);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err,
          });
        });
    }
  }

  return {
    txtScanValue,
    setTxtScanValue,
    handleScantxtValue_Change,
    txtScanoutValue,
    setTxtScanoutValue,
    handleScanouttxtValue_Change,
    filteredDataSource,
    DtData2,
    DtDataState,
    ddlvalue,
    setDdlValue,
    ddlData,
    setDdlData,
    ddlvalueout,
    setDdlValueout,
    ddlDataInState,
    ddlDataOutState,
    setDdlDataInState,
    setDdlDataOutState,
    columns,
    ddlFac,
    ddlFacValue, setDdlFacValue,
    ddlFacRequire , setDdlFacRequire,
    filteredDataSource2
  };
}

export { fn_Scanin };
