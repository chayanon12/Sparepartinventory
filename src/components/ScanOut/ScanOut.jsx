import {
  Autocomplete,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Button, Card, Flex, Select,Table } from "antd";
import React from "react";
import { fn_Scanin } from "../Scanin/fn_Scanin";
import "../Scanin/ScanIn.css";
import Scanner from "/src/assets/Scannerout.png";
function ScanOut() {
  const {
    txtScanoutValue,
    setTxtScanoutValue,
    handleScanouttxtValue_Change,
    DtData,
    DtDataState,
    ddlvalueout,
    setDdlValueout,
    ddlData,
    ddlDataOutState,
    setDdlDataOutState,
    ddlFac,
    ddlFacValue,
    setDdlFacValue,
    ddlFacRequire,
    setDdlFacRequire,
    filteredDataSource2,
    columns,
    ddlData2
  } = fn_Scanin();
  return (
    <div>
      {" "}
      <Flex gap="10px">
        <Card
          className="openCard"
          style={{
            width: "1250px",
            maxHeight: "630px",
            margin: "0 auto",
            overflow: "auto",
          }}
        >
          <div className="Scanhead">
            <img
              src={Scanner}
              alt="Scanner"
              style={{ width: "50px", height: "50px" }}
            />{" "}
            <h1 style={{ fontSize: "35px", color: "#d40c0ce3" }}>Scan Out</h1>
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <Autocomplete
              id="single-autocomplete"
              sx={{ width: 200, marginLeft: "50px" }}
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
            <Select
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
              style={{ width: 300, height: 40 }}
            ></Select>
            <TextField
              sx={{ width: 400 }}
              size="small"
              id="txtScan"
              label="Scan out serial number"
              value={txtScanoutValue}
              onChange={(e) => setTxtScanoutValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleScanouttxtValue_Change();
                }
              }}
            />

            <Button
              type="primary"
              style={{ marginLeft: 10, height: 40 }}
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
