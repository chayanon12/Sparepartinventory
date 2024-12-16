import {
  Autocomplete,
  TextField,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  TableContainer,
  Checkbox,
} from "@mui/material";
import { Button, Card, Flex } from "antd";
import axios from "axios";
import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Height, SelectAll } from "@mui/icons-material";

function GenerateBarcode() {
  return (
    <>
      <Flex
        direction="column"
        gap="10px"
        style={{ width: "100%", padding: "0 10px" }}
      >
        <Card
          className="openCard"
          style={{
            width: "1250px",
            maxHeight: "630px",
            margin: "0 auto",
            overflow: "auto",
          }}
        >
          <Flex gap={20}>
            {/* <Autocomplete
              id="single-autocomplete"
              sx={{ width: 300, marginLeft: "50px" }}
              value={ddlvalue}
              onChange={(event, newValue) => {
                setDdlValue(newValue);
                handleAutocompleteChange(newValue);
              }}
              options={ddlData}
              getOptionLabel={(option) => option.typename}
              renderInput={(params) => (
                <TextField id="autoComplete" {...params} label="Select Type" />
              )}
            /> */}
            <TextField
              // error={quantityState}
              id="quantity"
              label="Quantity"
              // value={quantity}
              // onChange={(e) => setQuantity(e.target.value)}
            ></TextField>
            <Button
              type="primary"
              // onClick={handleGeneClick}
              style={{ height: "50px", background: "#4f6f52", color: "white" }}
            >
              Genarate
            </Button>
            <Button
              type="primary"
              // onClick={exportPdf}
              style={{ height: "50px", background: "#4f6f52", color: "white" }}
            >
              Export Qrcode
            </Button>
          </Flex>
          {/* {snState && (
            <>
              <TableContainer component={Paper} className="TableSerial">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Serial Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox
                            checked={selectedItems.has(item.serial)}
                            onChange={() => handleSelect(item.serial)}
                          />
                        </TableCell>
                        <TableCell>{ddlvalue.typename || []}</TableCell>
                        <TableCell>{item.serial}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack
                spacing={2}
                style={{
                  marginTop: "20px",
                  marginLeft: "10px",
                  alignItems: "end",
                  maxWidth: "1100px",
                }}
              >
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Stack>
            </>
          )} */}
        </Card>
      </Flex>
    </>
  );
}

export default GenerateBarcode;
