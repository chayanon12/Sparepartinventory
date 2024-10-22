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
              label="Scan In ID Code (User)"
              value={user}
              onChange={(e) => setuser(e.target.value)}
              onBlur={handleScantxtIDUserValue_Change}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleScantxtIDUserValue_Change();
                }
              }}
            />
            {/* <Select
              id="ddlFac"
              showSearch
              placeholder="Select Dept"
              optionFilterProp="label"
              value={ddlFacValue}
              status={ddlFacRequire == true ? "error" : "success"}
              onChange={(event, newValue) => {
                setDdlFacValue(newValue);
                setDdlFacRequire(false);
              }}
              options={ddlFac.map((item) => ({
                // label: item.cc_ctr,
                label: `${item.cc_ctr} : ${item.cc_desc}`,
                value: item.cc_ctr,
              }))}
              style={{ width: 200, height: 40 }}
            ></Select> */}
            <TextField
              size="small"
              className="ScanOutUserIdTextF"
              disabled
              label="Dept."
              value={ddlFacValue}
              onChange={(e) => setDdlFacValue(e.target.value.trim())}
            />
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

            <Button
              type="primary"
              className="ScanOutbtn"
              onClick={handleScanouttxtValue_Change}
            >
              Submit
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
