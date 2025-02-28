import { Button, Card, Flex, Table, Select } from "antd";
import React, { useEffect, useState } from "react";
import { fn_Scanin } from "./fn_Scanin";
import "./ScanIn.css";
import { Autocomplete, Paper, TextField } from "@mui/material";
import Scanner from "/src/assets/Scanner.png";
function ScanIn({ state }) {
  const {
    txtScanValue,
    setTxtScanValue,
    handleScantxtValue_Change,
    filteredDataSource,
    DtDataState,
    ddlvalue,
    setDdlValue,
    ddlData,
    ddlDataInState,
    setDdlDataInState,
    columns,
  } = fn_Scanin();
  // useEffect(() => {
  //       if (admin == "") {
  //     document.getElementById("txtScanID").focus();
  //   }
  // },[])
  return (
    <div style={{ width: "100%" }}>
      <Card className="SpareopenCard">
        <div className="Scanhead">
          <img
            src={Scanner}
            alt="Scanner"
            style={{ width: "50px", height: "50px" }}
          />{" "}
          <h1 style={{ fontSize: "35px", color: "#4f6f52" }}>Scan In</h1>
        </div>

        <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
          <Autocomplete
            id="single-autocomplete"
            sx={{ width: 200, marginLeft: "50px" }}
            value={ddlvalue}
            size="small"
            onChange={(event, newValue) => {
              setDdlValue(newValue);
              setDdlDataInState(false);
              // handleAutocompleteChange(newValue);
            }}
            options={ddlData}
            getOptionLabel={(option) => option.typename}
            renderInput={(params) => (
              <TextField
                id="autoComplete"
                error={ddlDataInState}
                {...params}
                label="Select Type"
              />
            )}
          />
          {/* <TextField
              sx={{ width: 250 }}
              size="small"
              id="txtScanID"
              label="Scan In ID Code (Admin)"
              value={admin}
              onChange={(e) => setAdmin(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleScantxtIDValue_Change();
                }
              }}
            /> */}
          <TextField
            sx={{ width: 400 }}
            size="small"
            id="txtScan"
            label="Scan in serial number"
            value={txtScanValue}
            onChange={(e) => setTxtScanValue(e.target.value.trim())}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleScantxtValue_Change();
              }
            }}
          />
          <Button
            type="primary"
            style={{ marginLeft: 10, height: 40 }}
            onClick={handleScantxtValue_Change}
          >
            Submit
          </Button>
        </div>
        {DtDataState && (
          <Table
            className="TableAll"
            columns={columns}
            dataSource={filteredDataSource}
            pagination={{
              pageSize: 6,
            }}
          />
        )}
      </Card>
    </div>
  );
}

export default ScanIn;
