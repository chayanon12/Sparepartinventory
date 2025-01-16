import {
  Autocomplete,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Button, Card, Flex, Select, Table } from "antd";
import React, { useEffect } from "react";
import { fn_ScanOut } from "./fn_ScanOut";
import Scanner from "/src/assets/Scannerout.png";
import "./ScanOut.css";
import "../Common/StyleCommon.css";
function ScanOut() {
  const {
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
    filteredDataSource2,
    columns,
    user,
    setuser,
    handleScantxtIDUserValue_Change,
    setusername,
    username,
    remark,
    setRemark,
    btnCancel
  } = fn_ScanOut();
  useEffect(() => {
    if (user == "") {
      document.getElementById("txtScanIDUser").focus();
    }
  }, [user]);
  return (
    <div>
      {" "}
      <Flex gap="10px">
        <Card className="openCard">
          <div className="Scanhead">
            <img className="ScanOutImg" src={Scanner} alt="Scanner" />
            <h1 style={{ fontSize: "35px", color: "#d40c0ce3" }}>Scan Out</h1>
          </div>
          <div className="ScanOutFirstDiv">
            <Autocomplete
              className="ScanOutAutocomplete"
              id="single-autocomplete"
              value={ddlvalueout}
              size="small"
              onChange={(event, newValue) => {
                setDdlValueout(newValue);
                setDdlDataOutState(false);
              }}
              options={ddlData}
              getOptionLabel={(option) => option.typename}
              renderInput={(params) => (
                <TextField
                  id="autoCompleteout"
                  error={ddlDataOutState}
                  {...params}
                  label="Select Type"
                />
              )}
            />
            <TextField
              className="ScanOutUserIdTextF"
              size="small"
              id="txtScanIDUser"
              label="User ID Code"
              value={user}
              onChange={(e) => setuser(e.target.value)}
              onBlur={handleScantxtIDUserValue_Change}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleScantxtIDUserValue_Change();
                }
              }}
            />
            <TextField
              size="small"
              className="ScanOutUserIdTextF"
              label="User Name"
              value={username}
              onChange={(e) => setusername(e.target.value.trim())}
            />
            <TextField
              size="small"
              className="ScanOutUserIdTextF"
              label="Dept."
              value={ddlFacValue}
              onChange={(e) => {
                const input = e.target.value.trim();
                if (input.length <= 4) {
                  setDdlFacValue(input);
                }}
              }
            />

            {/* <Button
              type="primary"
              className="ScanOutbtn"
              onClick={handleScanouttxtValue_Change}
            >
              Submit
            </Button> */}
          </div>
          <div className="ScanOutFirstDiv">
            <TextField
              size="small"
              id="txtScanOut"
              className="ScanOutSerialTextF"
              label="Scan out serial number"
              value={txtScanoutValue}
              onChange={(e) => setTxtScanoutValue(e.target.value.trim())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleScanouttxtValue_Change();
                }
              }}
            />
            <TextField
              size="small"
              id="txtScanOutRemark"
              className="ScanOutRemark"
              label="Remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleScanouttxtValue_Change();
                }
              }}
            />
            <Button
              type="primary"
              className="ScanOutbtn"
              onClick={handleScanouttxtValue_Change}
            >
              Submit
            </Button>
            <Button
              type="primary"
              className="ScanOutbtnCancel"
              onClick={btnCancel}
            >
              Cancel
            </Button>
          </div>
          {DtDataState && (
            <Table
              className="TableAll"
              columns={columns}
              dataSource={filteredDataSource2}
              pagination={{
                pageSize: 6,
              }}
            />
          )}
        </Card>
      </Flex>
    </div>
  );
}

export default ScanOut;
