import {
  Button,
  Card as AntdCard,
  Flex,
  Table as AntdTable,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { fn_Scanin } from "./fn_Scanin";
import "./ScanIn.css";
import {
  Autocomplete,
  Paper,
  TextField,
  Input,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Card,
} from "@mui/material";
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
    date,
    handleDateChange,
    totalSerial,
    setTotalSerial,
    requestno,
    setRequestno,
    txtSerialState,
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
  } = fn_Scanin();
  return (
    <div>
      {" "}
      <Flex gap="10px">
        <AntdCard
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
            />
            <h1 style={{ fontSize: "35px", color: "#4f6f52" }}>Scan In</h1>
          </div>

          <div
            style={{
              marginLeft: "50px",
              marginTop: 10,
              display: "flex",
              gap: 10,
            }}
          >
            <TextField
              size="small"
              id="txtRequestNO"
              label="Request No."
              value={requestno}
              disabled={txtRequestNOState}
              onChange={(e) => setRequestno(e.target.value.trim())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handle_RequestNO_Change(e.target.value.trim());
                }
              }}
            />
            <Autocomplete
              id="single-autocomplete"
              sx={{ width: 320 }}
              value={ddlvalue}
              size="small"
              disabled={txtItemTypeState}
              options={ddlData}
              getOptionLabel={(option) => option.typename}
              isOptionEqualToValue={(option, value) =>
                option.typename === value.typename
              }
              onChange={(event, newValue) => {
                console.log("newValue", newValue);
                setDdlValue(newValue);
                setDdlDataInState(false);
              }}
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
              size="small"
              type="date"
              label="Date"
              value={date}
              disabled={txtdataState}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleDateChange(e.target.value)}
            />

            <TextField
              id="txtTotalSerial"
              size="small"
              disabled={totalSerialState}
              style={{ width: 90 }}
              label="Total Serial"
              value={totalSerial}
              onChange={(e) =>
                setTotalSerial(e.target.value.replace(/[^0-9]/g, ""))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  btnExecute_Click();
                }
              }}
            />
            <Button
              type="primary"
              style={{ marginLeft: 10, height: 40, width: 80 }}
              onClick={btnExecute_Click}
            >
              Execute
            </Button>
            <Button
              type="primary"
              style={{ height: 40, background: "red", width: 80 }}
              onClick={btnCancel_Click}
            >
              Clear
            </Button>
          </div>
          <table style={{ marginLeft: 50 }}>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  width: "300px",
                  padding: "0",
                  margin: "0",
                  verticalAlign: "top",
                  paddingTop: "25px",
                }}
              >
                {" "}
                {txtSerialState && (
                  <Table className="ScaninSerialTable" component={Card}>
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Serial Number</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.from({ length: totalSerial }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <input
                              type="text"
                              id={`txtSerial_${index}`}
                              style={{
                                width: "98%",
                                padding: "2px 2px 2px 2px",
                                borderRadius: "2px",
                                border: "1px solid #ccc",
                              }}
                              value={txtSerial[index] || ""}
                              onChange={(e) => handletxtSerialChange(index, e)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handletxtSerialChange(index, e);
                                }
                              }}
                              disabled={txtSerialGet.includes(txtSerial[index])} 
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Button onClick={saveData}>Save</Button>
                          &nbsp;
                          <Button>Submit</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
              </td>
              <td
                style={{
                  verticalAlign: "top",
                  minHeight: "100px",
                  width: "900px",
                }}
              >
                {DtDataState && (
                  <AntdTable
                    className="TableAllScainNewarr"
                    shadow-2-up
                    columns={columns}
                    dataSource={DtData2}
                    pagination={{
                      pageSize: 6,
                    }}
                  />
                )}
              </td>
            </tr>
          </table>
        </AntdCard>
      </Flex>
    </div>
  );
}

export default ScanIn;
