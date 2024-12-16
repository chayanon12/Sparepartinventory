import React, { useState } from "react";
import Scanner from "/src/assets/Scanner.png";
import { Button, Card, Flex, Table, Select } from "antd";
import { Autocomplete, Paper, TextField } from "@mui/material";
import "./ScanIn.css";
import { fn_scanin } from "./fn_scanin";
function Scanin() {
  const { ddlvalue, setDdlValue, ddlData, ddlDataInState, setDdlDataInState } =
    fn_scanin();
  return (
    <>
      {console.log(ddlData)}
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
            <h1 style={{ fontSize: "35px", color: "White" }}>Scan In</h1>
          </div>

          <Card className="SecondCardNew">
            <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
              {/* <span
              style={{ fontSize: "16px", fontWeight: "500", color: "white" }}
            >
              Select Type :
            </span> */}
              <Autocomplete
                id="single-autocomplete"
                sx={{
                  width: 200,
                  marginLeft: "50px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
                value={ddlvalue}
                size="small"
                onChange={(event, newValue) => {
                  setDdlValue(newValue);
                  setDdlDataInState(false);
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
              <TextField
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  width: "400px",
                }}
                label="Scan in serial number"
                size="small"
              />
              <Button
                style={{
                  marginLeft: 5,
                  height: 40,
                  backgroundColor: "#121d2b",
                  color: "white",
                  border: "none",
                }}
              >
                Submit
              </Button>
            </div>
          </Card>
        </Card>
      </Flex>
    </>
  );
}

export default Scanin;
