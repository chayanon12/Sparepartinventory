import React from "react";
import {
  Button,
  Card,
  Flex,
  Table,
  Select,
  Alert,
  notification,
  Form,
  Input,
  Popconfirm,
  Typography,
  message,
} from "antd";
import { Autocomplete, Paper, TextField } from "@mui/material";

function Addtype() {
  return (
    <>
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
                <table style={{ display: "flex", justifyContent: "center" }}>
                  <tr>
                    <td>
                      <label>Item Name : </label>
                    </td>
                    <td>
                      <TextField
                        sx={{ marginLeft: 2, width: 200 }}
                        size="small"
                        id="itemname"
                        // label="Input new item name"
                        // value={txtItemName}
                        // onChange={(e) => setTxtItemName(e.target.value)}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     document.getElementById("itemtype").focus();
                        //   }
                        // }}
                      />
                    </td>
                    <td style={{ paddingLeft: 10 }}>
                      <label>Item Type : </label>
                    </td>
                    <td>
                      <TextField
                        sx={{ marginLeft: 2, width: 200 }}
                        size="small"
                        id="itemtype"
                        // label="Input new item type"
                        // value={txtItemType}
                        // onChange={(e) => setTxtItemType(e.target.value)}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     submitData();
                        //   }
                        // }}
                      />
                    </td>
                    <td style={{ paddingLeft: 10 }}>
                      <label>Item Abbr : </label>
                    </td>
                    <td>
                      <TextField
                        sx={{ marginLeft: 2, width: 150 }}
                        size="small"
                        id="itemtype"
                        // label="Input new item type"
                        // value={txtAbbr}
                        // onChange={(e) => setTxtAbbr(e.target.value)}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     submitData();
                        //   }
                        // }}
                      />
                    </td>
                    <td>
                      <Button
                        type="primary"
                        style={{ marginLeft: 10, height: 40 }}
                        // onClick={submitData}
                      >
                        Submit
                      </Button>
                    </td>
                    <td>
                      <Button
                        type="primary"
                        style={{ marginLeft: 10, height: 40 }}
                        // onClick={Checktype}
                      >
                        Check Type
                      </Button>
                    </td>
                  </tr>
                </table>
                {/* {DtDataState && (
                  <Form form={form} component={false}>
                    <Table
                      components={{ body: { cell: EditableCell } }}
                      className="AddTypeTable"
                      bordered
                      dataSource={data}
                      columns={mergedColumns}
                      scroll={{ y: 55 * 5 }}
                      rowClassName="editable-row"
                      pagination={{ onChange: cancel }}
                    />
                  </Form>
                )} */}
              </Card>
            </Flex>
    </>
  )
}

export default Addtype