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
    requestpo,
    setRequestpo,
    txtSerialState,
    btnExecute_Click,
    btnCancel_Click,
    handletxtSerialChange,
    txtSerial,
    setTxtSerial,
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
            />{" "}
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
            <Autocomplete
              id="single-autocomplete"
              sx={{ width: 200 }}
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
              size="small"
              type="date"
              label="Date"
              value={date}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleDateChange(e.target.value)}
            />
            <TextField
              size="small"
              id="txtRequestPO"
              label="PO Request"
              value={requestpo}
              onChange={(e) => setRequestpo(e.target.value.trim())}
            />
            <TextField
              id="txtTotalSerial"
              size="small"
              label="Total Serial"
              value={totalSerial}
              onChange={(e) => setTotalSerial(e.target.value)}
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
          <div
            style={{
              marginTop: 10,
              display: "flex",
              marginLeft: "50px",
              gap: 10,
              width: "1200px",
              justifyContent: "left",
            }}
          >
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
                        {/* <TextField
                          size="small"
                          id={`txtSerial_${index}`}
                          className="txtSerialScanIn"
                          sx={{width:300,padding:'0px 0px 0px 0px'}}
                          value={txtSerial[index] || ""}
                          onChange={(e) => handletxtSerialChange(index, e)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handletxtSerialChange(index, e);
                            }
                          }}
                        /> */}
                        <input
                          type="text"
                          id={`txtSerial_${index}`}
                          style={{
                            width: "98%",
                            textTransform: "uppercase",
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
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow >
                    <TableCell colSpan={2} >
                      <Button>Save</Button>
                      &nbsp;
                      <Button>Submit</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
            
            {/* {txtSerialState && (
              <>
                {Array.from({
                  length: Math.ceil(totalSerial / (totalSerial < 10 ? 5 : 10)),
                }).map((_, tableIndex) => (
                  <div
                    style={{ display: "inline-block", marginRight: 20 }}
                    key={tableIndex}
                  >
                    <Table className="ScaninSerialTable" component={Card}>
                      <TableHead>
                        <TableRow>
                          <TableCell>No</TableCell>
                          <TableCell>Serial Number</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.from({ length: totalSerial < 10 ? 5 : 10 }).map(
                          (_, rowIndex) => {
                            const index =
                              tableIndex * (totalSerial < 10 ? 5 : 10) +
                              rowIndex;
                            if (index < totalSerial) {
                              return (
                                <TableRow key={index}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>
                                    <TextField
                                      size="small"
                                      id={`txtSerial_${index}`}
                                      value={txtSerial[index] || ''}
                                      onChange={(e) =>
                                        handletxtSerialChange(index, e)
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          handletxtSerialChange(index, e);
                                        }
                                      }}
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            }
                            return null;
                          }
                        )}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </>
            )} */}

            {/* <TextField
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
            </Button> */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              gap: 20,
            }}
          >
            {/* <Button>Save</Button>
            <Button>Submit</Button> */}
          </div>

          {DtDataState && (
            <AntdTable
              className="TableAll"
              columns={columns}
              dataSource={filteredDataSource}
              pagination={{
                pageSize: 6,
              }}
            />
          )}
        </AntdCard>
      </Flex>
    </div>
  );
}

export default ScanIn;
