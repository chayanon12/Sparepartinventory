import React from "react";
import Scanner from "/src/assets/Scanner.png";
import { Button, Card, Flex, Table,Select } from "antd";
import { Autocomplete, Paper, TextField } from "@mui/material";
import './ScanIn.css'
function Scanin() {
  return (
    <>
      <Flex gap="10px">
        <Card
          className="openCardNew"
          style={{
            width: "1250px",
            maxHeight: "630px",
            margin: "0 auto",
            overflow: "auto",
          }}
        >
          <div className="ScanheadNew">
            <img
              src={Scanner}
              alt="Scanner"
              style={{ width: "50px", height: "50px" }}
            />{" "}
            <h1 style={{ fontSize: "35px", color: "#4f6f52" }}>Scan In</h1>
          </div>

          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            {/* <Autocomplete
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
            /> */}
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
              // value={txtScanValue}
              // onChange={(e) => setTxtScanValue(e.target.value.trim())}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     handleScantxtValue_Change();
              //   }
              // }}
            />
            <Button
              type="primary"
              style={{ marginLeft: 10, height: 40 }}
              // onClick={handleScantxtValue_Change}
            >
              Submit
            </Button>
          </div>
          {/* {DtDataState && (
            <Table
              className="TableAll"
              columns={columns}
              dataSource={filteredDataSource}
              pagination={{
                pageSize: 6,
              }}
            />
          )} */}
        </Card>
      </Flex>
    </>
  );
}

export default Scanin;
